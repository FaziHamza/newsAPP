import { Link, Outlet, useLocation } from 'react-router-dom';
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
import { useDispatch, useSelector } from 'react-redux';
import { setFlag } from '../../redux/countries';
import { video_play } from '../../assets';
const Root = () => {
  const favouriteMenu = useSelector((state) => state?.favouriteMenu);
  const selectedOrigin = useSelector((state) => state?.origin?.selectedOrigin);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  // console.log("use Location ", pathname);

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
    // console.log("Selected Origin./././././ ", selectedOrigin);
    const settingsPromise = fetchConfig(`${selectedOrigin?.baseUrl}`);
    setWindowHref(`${selectedOrigin?.baseUrl}`);
    run(settingsPromise);
  }, [selectedOrigin]);
  useEffect(() => {
    if (settingsInfo) {
      dispatch(setFlag(settingsInfo?.Url));
    }
  }, [settingsInfo]);
  function ScrollToActiveTab(id) {
    // Get references to the div and the target element
    var scrollableDiv = document.getElementById('scrollableDiv');
    let tempId = 'targetId-' + id;
    var targetElement = document.getElementById(tempId);

    var targetPosition = targetElement?.offsetLeft - window.innerWidth * 0.4;

    // Scroll the div to the target position
    scrollableDiv.scrollLeft = targetPosition;
  }

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
      // console.log("Image URL ", settingsInfo?.Url);
      return (
        <MediaQueryProvider>
          <ThemeQueryProvider value={themeVariant}>
            <div className={'App dark'}>
              <header>
                {isDesktop ? (
                  <div className="main-header desktop">
                    <div className="item logo">
                      <Logo name={'Logo'} href="/" alt={'logo'} />
                    </div>
                    <div className="item flag">
                      <Logo name={'Flag'} href="/" alt={'logo'} /> <h2 className="logo-title"></h2>
                    </div>
                    <div className="item menu">
                      <NavbarMobile
                        navList={settingsInfo.MenuItems}
                        setThemeVariant={setThemeVariant}
                        themeVariant={themeVariant}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="main-header">
                    <div className="item">
                      <NavbarMobile
                        navList={settingsInfo.MenuItems}
                        setThemeVariant={setThemeVariant}
                        themeVariant={themeVariant}
                      />
                      {/* <span style={{ fontSize: '30px', cursor: 'pointer' }}>&#9776;</span> */}
                    </div>
                    <div className="item">
                      <Logo name={'Logo'} href="/" alt={'logo'} />
                    </div>
                    <div className="item">
                      <Logo name={'Flag'} href="/" alt={'logo'} />
                    </div>
                  </div>
                )}

                <div className="top-bar lg-d-none" id="scrollableDiv">
                  {favouriteMenu?.map((m, i) => {
                    return (
                      <Link
                        key={i}
                        id={`targetId-${i}`}
                        className={
                          pathname == `/${m?.state?.navType}/${m?.state?.navTopic}`
                            ? 'active fw-bold tab'
                            : 'tab'
                        }
                        to={m.link}
                        state={m?.state}
                        name={m?.name}
                        onClick={() => ScrollToActiveTab(i)}>
                        {/* Display the LogoTeam image if it exists */}
                        <div className="action-bar">
                          {m?.name?.toLowerCase() === 'top news'
                            ? m?.state?.LogoPath && (
                                <img
                                  className="action-bar-img"
                                  src={m?.state?.LogoPath}
                                  alt={`${m?.name} logo`}
                                />
                              )
                            : m?.state?.LogoTeam && (
                                <img
                                  className="action-bar-img"
                                  src={m?.state?.LogoTeam}
                                  alt={`${m?.name} logo`}
                                />
                              )}
                        </div>
                        {m?.name?.toLowerCase() == 'top news'
                          ? `${m.name} ${m?.state?.moreItemName}`
                          : m?.name}

                        {pathname == `/${m?.state?.navType}/${m?.state?.navTopic}` && (
                          <img
                            className=" imgg"
                            src={video_play}
                            alt={`${m?.name} logo`}
                          />
                        )}
                      </Link>
                    );
                  })}
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
