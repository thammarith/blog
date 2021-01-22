import React from 'react';

import styles from './Header.module.scss';

import Logo from '../../../assets/images/logo.png';
import { Link } from 'gatsby';

const Header: React.FC = () => {
	return (
		<header className={styles.header}>
			<Link to="/">
				<img
					alt="Thammarith's Blog"
					className={styles.logo}
					src={Logo}
					title="Homepage"
				/>
			</Link>
		</header>
	);
};

export default Header;
