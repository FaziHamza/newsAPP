import { Outlet } from 'react-router-dom';
import { MediaQueryProvider } from '../../utilities/mediaQuery';
import { ThemeQueryProvider } from '../../utilities/themeQuery';
import { useAsync } from '../../utilities/asyncReducer';
import { Icon } from '../../components';
import './root.css';

import { fetchConfig, fetchGetFunction } from '../../utilities/fetch';

import { Logo, NavbarMobile, Navigation } from '../../compositions';
// Mockup images imports
import { useMediaQuery, useTheme } from '../../utilities/hooks';
import { useEffect, useState } from 'react';
import { getData } from '../../assets/mockup-assets/data/dataObject';
// import { addresses } from '../../utilities/config';
import { useDispatch, useSelector } from 'react-redux';
import { setApiOrigin, setFlag } from '../../redux/countries';
const Root = () => {
 const dispatch =  useDispatch()
 const addresses = useSelector(state=>state.origin.apiOrigin)
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
  }, [addresses]);

  useEffect(()=>{
    if(settingsInfo){
      dispatch(setFlag(settingsInfo?.Url))
    }
      },[settingsInfo])
      useEffect(()=>{
        // let hostName = window.location.host;
        fetchGetFunction(`https://jsonplaceholder.typicode.com/posts/1`).then(res=>{
          console.log("Responce From Dummy Request ", res);

          dispatch(setApiOrigin({
              settingsUrl: 'https://sportspotengland.dev/v4/api/topics-with-subtopics-Mobile',
              baseUrl: 'https://sportspotengland.dev/v4/',
              siteLang: 'en',
              siteKeyword: 'ENG',
              siteLimit: 12          }))
        }).catch(err=>{
          console.log("Error From Dummy Request ", err);
        })

      },[]);
    

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

                    <div className='item-container item-one' >
                    <div className='item logo'><Logo name={'Logo'} href="/" alt={'logo'} /></div>
                    <div className='item flag'><Logo name={'Flag'} href="/" alt={'logo'} /> <h2 className='logo-title'></h2></div>
                    </div>

                    <div className='item-container item-two' >

                  <a href='https://www.sportspotnews-landingpage.com/' target='_blank' className='playstore item' >

                  </a>

                    <div className='item menu'>
                      <NavbarMobile navList={settingsInfo.MenuItems} setThemeVariant={setThemeVariant} themeVariant={themeVariant}  />
                    </div>
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

              </header>


              {/* <Navigation className="nav-main" navList={settingsInfo.MenuItems} /> */}
              <Outlet context={fullInfo} />
            </div>
            <footer>
              <a href='https://www.sportspotnews-landingpage.com/' target='_blank' className='footer-img footer' >
                    
              </a>
            </footer>
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
