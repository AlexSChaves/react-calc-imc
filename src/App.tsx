import styles from './App.module.css';
import React, { ChangeEvent } from 'react';
import { calculateIMC, Level, levels } from './helpers/imc';
import GridItem from './components/GridItem';
import poweredImage from './assets/powered.png';
import leftArrowImage from './assets/leftarrow.png';

const App = () => {
	const [heightField, setHeightField] = React.useState<number>(0);
	const [weightField, setWeightField] = React.useState<number>(0);
	const [toShow, setToShow] = React.useState<Level | null>(null);

	const handleChangeHeight = ({ target }: ChangeEvent<HTMLInputElement>) => {
		setHeightField(parseFloat(target.value));
	};

	const handleChangeWeight = ({ target }: ChangeEvent<HTMLInputElement>) => {
		setWeightField(parseFloat(target.value));
	};

	const handleCalculateButton = () => {
		if (heightField && weightField) {
			setToShow(calculateIMC(heightField, weightField));
		} else {
			alert('Digite todos os campos');
		}
	};

	const handleBackButton = () => {
		setToShow(null);
		setHeightField(0);
		setWeightField(0);
	};

	return (
		<div className={styles.main}>
			<header className={styles.headerContainer}>
				<img src={poweredImage} alt='' />
			</header>
			<div className={styles.container}>
				<div className={styles.leftSide}>
					<h1>Calcule o seu IMC</h1>
					<p>
						IMC é a sigla para Índice de Massa Corpórea, parâmetro adotado pela
						Organização Mundial de Saúde para calcular o peso ideal de cada
						pessoa.
					</p>
					<input
						type='number'
						placeholder='Digite a sua altura. Ex: 1.5 (em metros)'
						value={heightField > 0 ? heightField : ''}
						onChange={handleChangeHeight}
						disabled={toShow ? true : false}
					/>
					<input
						type='number'
						placeholder='Digite o seu peso. Ex: 57.0 (em quilos)'
						value={weightField > 0 ? weightField : ''}
						onChange={handleChangeWeight}
						disabled={toShow ? true : false}
					/>
					<button
						onClick={handleCalculateButton}
						disabled={toShow ? true : false}
					>
						Calcular
					</button>
				</div>
				<div className={styles.rightSide}>
					{!toShow && (
						<div className={styles.grid}>
							{levels.map((item, key) => (
								<GridItem key={key} item={item} />
							))}
						</div>
					)}
					{toShow && (
						<div className={styles.rightBig}>
							<div className={styles.rightArrow} onClick={handleBackButton}>
								<img src={leftArrowImage} alt='' width={25} />
							</div>
							<GridItem item={toShow} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default App;
