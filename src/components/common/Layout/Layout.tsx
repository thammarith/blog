import React from 'react';

import Header from '../Header/Header';

import styles from './Layout.module.scss';

interface LayoutProps {
	location: any;
	title: any;
	children: any;
}

const Layout: React.FC<LayoutProps> = ({ location, title, children }) => {

	return (
		<div className={styles.layoutWrapper}>
			<Header />

			<main className={styles.mainLayout}>
				{children}
			</main>
			{/* <footer>
			  © {new Date().getFullYear()}, Built with
			  {` `}
			  <a href="https://www.gatsbyjs.com">Gatsby</a>
			</footer> */}
		</div>
	);
};

export default Layout;
