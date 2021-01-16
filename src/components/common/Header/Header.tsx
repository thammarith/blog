import React from 'react';

import styles from './Header.module.scss';

import Logo from '../../../../content/assets/logo.png';

const Header: React.FC = () => {
	return (
		<div className={styles.header}>
			<img
				alt="Thammarith's Blog"
				className={styles.logo}
				src={Logo}
				title="Homepage"
			/>
		</div>
	);
};

export default Header;
