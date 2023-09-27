import { Outlet } from 'react-router-dom';
import { MediaQueryProvider } from '../../utilities/mediaQuery';
import { ThemeQueryProvider } from '../../utilities/themeQuery';
import { useAsync } from '../../utilities/asyncReducer';
import { Icon } from '../../components';
import './root.css';

import { fetchConfig } from '../../utilities/fetch';

import { Logo, NavbarMobile, Navigation } from '../../compositions';
// Mockup images imports
import { useMediaQuery, useTheme } from '../../utilities/hooks';
import { useEffect, useState } from 'react';
import { getData } from '../../assets/mockup-assets/data/dataObject';
import { addresses } from '../../utilities/config';
const Root = () => {
  const { data: settingsInfo, status, error, run } = useAsync({ status: 'pending' });
  const [themeVariant, setThemeVariant] = useTheme('dark'); // 'dark', 'light'
  const [windowHref, setWindowHref] = useState('');
  const isDesktop = useMediaQuery('width', 1024);
  const themeIcon = getData().themeIcon;
  const toggleTheme = (inputValue, valueOne, valueTwo) => {
    if (inputValue === valueOne) {
      setThemeVariant(valueTwo);
    } else {
      setThemeVariant(valueOne);
    }
  };

  useEffect(() => {
    const settingsPromise = fetchConfig(`${addresses.baseUrl}`);
    setWindowHref(`${addresses.baseUrl}`);
    run(settingsPromise);
  }, []);

  switch (status) {
    case 'idle':
      return <div>idle</div>;
    case 'pending':
      return (
        <main>
          <div className="pending">loading</div>
        </main>
      );
    case 'resolved': {
      if (!settingsInfo || typeof settingsInfo.MenuItems === 'undefined') {
        // Log or handle the error as you see fit
        return <div>Error: Missing settings information</div>;
      }
      const fullInfo = [settingsInfo, windowHref];
      return (

        <MediaQueryProvider>
          <ThemeQueryProvider value={themeVariant}>
            <div className={'App dark'}>
              <header>
                {isDesktop ? (
                  <div className='main-header desktop'>
                    <div className='item logo'><Logo name={'Logo'} href="/" alt={'logo'} /></div>
                    <div className='item flag'><Logo name={'Flag'} href="/" alt={'logo'} /> <h2 className='logo-title'></h2></div>
                    <div className='item menu'>
                      <NavbarMobile navList={settingsInfo.MenuItems} setThemeVariant={setThemeVariant} themeVariant={themeVariant} />
                    </div>
                  </div>
                )
                  :
                  (
                    <div className='main-header'>
                      <div className='item'>
                        <NavbarMobile navList={settingsInfo.MenuItems} setThemeVariant={setThemeVariant} themeVariant={themeVariant} />
                        {/* <span style={{ fontSize: '30px', cursor: 'pointer' }}>&#9776;</span> */}

                      </div>
                      <div className='item'><Logo name={'Logo'} href="/" alt={'logo'} /></div>
                      <div className='item'><Logo name={'Flag'} href="/" alt={'logo'} /></div>


                    </div>
                  )}

                <div className='top-bar lg-d-none'>
                  <a href="">United States</a>
                  <a href="">Australia</a>
                  <a href="">France</a>
                  <a href="">Argentina</a>
                  <a href="" className='active'>Canada</a>
                  <a href="">China</a>
                  <a href="">Germany</a>
                  <a href="">Afghanistan</a>
                  <a href="">Canada</a>
                </div>
              </header>

              {/* <Navigation className="nav-main" navList={settingsInfo.MenuItems} /> */}
              <Outlet context={fullInfo} />
            </div>
          </ThemeQueryProvider>
        </MediaQueryProvider>
      );
    }
    case 'rejected':
      return <div>{error}</div>;
    default:
      return <div>anotherError</div>;
  }
};

export default Root;
