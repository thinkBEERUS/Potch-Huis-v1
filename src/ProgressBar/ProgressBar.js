import {CircularProgressbar} from "react-circular-progressbar";
import StockProvider from "./StockProvider.js";
import './ProgressBar.css';
import "react-circular-progressbar/dist/styles.css";

function ProgressBar(stockLeft) {

    const colorCalculator = (percent, start, end) => {
        let a = percent / 100, 
        b = (end - start) * a, 
        c = b + start;

        return "hs1("+ c +", 100%, 50%)";
    }

    const Circle = (score) => {
        <CircularProgressbar
            value={score}
            text={`${score} %`}
            circleRatio={0.7}
            styles={{
                trail: {
                    strokeLinecap: "butt",
                    transform: "rotate(-126deg)",
                    transformOrigin: "center center"
                },
                path: {
                    strokeLinecap: "butt",
                    transform: "rotate(-126deg)",
                    transformOrigin: "center center",
                    stroke: colorCalculator(score, 0, 120)
                },
                text: {
                    fill: "#ddd"
                }
            }}    
            strokeWidth={10}
        />
    };
    return (
        <>
            <h1>Strain 1</h1>
            <Circle score={stockLeft} />
        </>
    );
}

export default ProgressBar;