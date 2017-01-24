import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"

import Layout from "./components/Layout"
import Contents from "./components/Contents"
import store from './store'

require('../css/style.scss');
const app = document.getElementById('app');

ReactDOM.render(
	<Provider store={ store }>
		<Layout/>
	</Provider>
, app);
