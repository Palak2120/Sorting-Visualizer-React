import { useEffect, useState } from 'react';
import './App.css';

import Bars from './components/bar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Button from '@mui/material/Button';
import { Grid } from '@mui/material';

import bubbleSort from './algorithms/BubbleSort';
import insertionSort from './algorithms/InsertionSort';
import mergeSort from './algorithms/MergeSort';
import quickSort from './algorithms/QuickSort';
import selectionSort from './algorithms/SelectionSort';

function App() {

  const [state, setState] = useState({
    array: [],
    arraySteps: [],
    colorKey: [],
    colorSteps: [],
    currentStep: 0,
    count: 20,
    delay: 100,
    algorithm: 'Bubble Sort',
    timeouts: [],
    generateStepsFlag: false,
  });

  const algos = ['Bubble Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort', 'Selection Sort'];
  let ALGORITHMS = {
    'Bubble Sort': bubbleSort,
    'Insertion Sort': insertionSort,
    'Merge Sort': mergeSort,
    'Quick Sort': quickSort,
    'Selection Sort': selectionSort
  }

  useEffect(() => generateRandomArray, []);

  const generateRandomArray = () => {
    const count = state.count;
    const randomArray = [];
    for (let i = 0; i < count; i++) {
      randomArray.push(Math.floor(Math.random() * 150) + 50);
    }
    let initialColorKey = new Array(count).fill(0);
    state.timeouts.forEach((timeout) => clearTimeout(timeout));

    setState({
      ...state,
      array: randomArray,
      arraySteps: [randomArray],
      currentStep: 0,
      colorKey: initialColorKey,
      colorSteps: [initialColorKey],
      timeouts: [],
      generateStepsFlag: true,
    });
  }

  useEffect(() => {
    if (state.generateStepsFlag) {
      generateSteps();
    }
  }, [state.generateStepsFlag]);

  const generateSteps = () => {

    let array = state.array.slice();
    let steps = state.arraySteps.slice();
    let colorSteps = state.colorSteps.slice();

    ALGORITHMS[state.algorithm](array, 0, steps, colorSteps);

    setState({
      ...state,
      arraySteps: steps,
      colorSteps: colorSteps,
      generateStepsFlag: false
    });
  }

  let bars = state.array.map((number, index) => {
    return <Bars key={index} number={number} index={index} color={state.colorKey[index]} />;
  });

  const startSorting = () => {
    const { arraySteps, colorSteps, delay, currentStep } = state;
    const timeouts = [];

    for (let i = currentStep; i < arraySteps.length; i++) {
      const timeout = setTimeout(() => setState({
        ...state,
        array: arraySteps[i],
        colorKey: colorSteps[i],
        currentStep: i + 1,
      }), delay * (i - currentStep));
      timeouts.push(timeout);
    }

    setState({
      ...state,
      timeouts: timeouts,
    })
  }

  let playButton = (
    <Button style={{ fontFamily: 'monospace', backgroundColor: '#434840', color: '#fff', maxHeight: '8vh' }}>
      <PlayArrowIcon size='large' onClick={startSorting} />
    </Button>)

  const handleClickAlgoButton = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const selectAlgorithm = (myAlgo) => {
    const currArray = state.array;
    let count = state.count;
    let initialColorKey = new Array(count).fill(0);
    state.timeouts.forEach((timeout) => clearTimeout(timeout));

    setState({
      ...state,
      array: currArray,
      arraySteps: [currArray],
      colorKey: initialColorKey,
      colorSteps: [initialColorKey],
      algorithm: myAlgo,
      timeouts: [],
      generateStepsFlag: true
    });
    setAnchorEl(null);
  }

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);


  let algoButton = (
    <div style={{ position: 'relative' }}>
      <Button variant="contained"
        style={{ fontFamily: 'monospace', backgroundColor: '#434840', maxHeight: '8vh' }}
        onClick={handleClickAlgoButton}
        endIcon={<KeyboardArrowDownIcon />}
        aria-controls={open ? 'resources-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        id='algorithm-button'>
        Algorithm
      </Button>
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl} MenuListProps={{
        "aria-labelledby": 'algorithm-button'
      }}>
        {algos.map((algo, index) => {
          return <MenuItem key={index} onClick={() => selectAlgorithm(algo)} style={{ fontFamily: 'monospace' }} disableRipple>{algo}</MenuItem>
        })}
      </Menu>

    </div>
  )

  return (
    <>
      <Grid container height='20vh' minWidth='100%' backgroundColor='#2e2b2b' >
        <h1>Sorting Visualizer </h1>
      </Grid>

      <Grid container spacing={2} backgroundColor="#2e2b2b" height='10vh' minWidth='100%' >
        <Grid item>
          <Button variant='contained' onClick={generateRandomArray} style={{ fontFamily: 'monospace', backgroundColor: '#434840', maxHeight: '8vh' }}>New Array</Button>
        </Grid>
        <Grid item>
          {algoButton}
        </Grid>
        <Grid item>
          {playButton}
        </Grid>
      </Grid>

      <div className="container">
        <div className="frame">
          {bars}
        </div>
      </div>
    </>
  );
}

export default App;
