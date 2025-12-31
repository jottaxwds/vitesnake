import './styles.css';

const ScoreBoard = ({ scores }: { scores: number[]}) => (
    <div className="scores">
        <h4>Top 10:</h4>
        <ul className="scores-list">
            {
                [...scores.sort((a, b) => b-a)].map((sc, index) => index <= 9 ? <li key={index}>{ sc }</li>: null)
            }
        </ul>
    </div>
);

export default ScoreBoard;