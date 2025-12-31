import './styles.css';

const GameOverPopUp = ({ onReset }: { onReset: () => void }) => (
    <div className="gameover">
        <h2>You loose!</h2>
        <button className="reset-button" onClick={() => onReset()}>Retry</button>
    </div>
);

export default GameOverPopUp;