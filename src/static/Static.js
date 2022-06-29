import * as React from 'react';
import { Suspense } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import { Route, Routes, useSearchParams } from 'react-router-dom'

import logo from '../images/logo.png'
import PrivacyPolicy from './PrivacyPolicy.jsx';
import TermsAndConditions from './TermsAndConditions.jsx';
import PageErrorBoundary from './PageErrorBoundary.jsx';

import Footer from '../components/Footer.jsx';
let AppBarHeader = <AppBar style={{
    position: `inherit`

}} >
    <Toolbar
        sx={{
            pr: '24px', // keep right padding when drawer closed
        }}
    >
        <div style={{
            display: "flex",
            alignItems: "center"
        }}>{window.innerWidth > 550 ?
            <Link href='/'>
                <CardMedia style={{
                    height: "42px",
                    width: "200px"
                }}
                    component="img"
                    alt="logo"

                    image={logo}
                /></Link> : <></>}
            <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
            >
                Details

            </Typography>

        </div>
        <div style={{ width: "-webkit-fill-available" }}></div>

    </Toolbar>
</AppBar>

export default function (props) {
    let [searchParams, setSearchParams] = useSearchParams();

    // searchParams is a URLSearchParams object.
    // See https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    let page = searchParams.get("page");
    console.log(page)

    const Module = React.lazy(() => import(`./${page}`));

    return <Routes>

        <Route path="/static/*" element={<>
            {AppBarHeader}
            <PageErrorBoundary>
                <Suspense fallback={<div>Loading...</div>}>
                    <Module />
                </Suspense>
            </PageErrorBoundary>
            <Footer />
        </>
        } />
    </Routes>

}