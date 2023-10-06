import './bar.css';

function Bars ({number, index, color}) {
    const colors=['#8e59a7','#5c77c1','#63cf73','#b2ce50','#ba6330'];

    const barStlyle ={
        height: `${2*number}px`,
        backgroundColor: colors[color]
    };

    const textStyle ={
        position: 'relative',
        top: number - 10,
		background: 'transparent',
		border: 'none',
        color: 'white',
        transform: 'rotate(270deg)',
    }
return(
    <>
    <div className="bar" style={barStlyle}>
    <div className="bar-number" style={textStyle}>
        {number}
    </div>
    </div>
    </>
);
}

export default Bars;