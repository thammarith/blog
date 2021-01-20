import React from 'react';

import styles from './Header.module.scss';

import Logo from '../../../assets/images/logo.png';

const Header: React.FC = () => {
	return (
		<header className={styles.header}>
			<img
				alt="Thammarith's Blog"
				className={styles.logo}
				src={Logo}
				title="Homepage"
			/>
		</header>
	);
};

export default Header;
