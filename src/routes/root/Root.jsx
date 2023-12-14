import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MediaQueryProvider } from '../../utilities/mediaQuery';
import { ThemeQueryProvider } from '../../utilities/themeQuery';
import { useAsync } from '../../utilities/asyncReducer';
import { Icon } from '../../components';
import './root.css';
import { RootUrl } from '../../utilities/config';

import { fetchConfig, fetchGetFunction } from '../../utilities/fetch';

import { Logo, NavbarMobile, Navigation } from '../../compositions';
// Mockup images imports
import { useMediaQuery, useTheme } from '../../utilities/hooks';
import { useEffect, useState, useRef } from 'react';
import { getData } from '../../assets/mockup-assets/data/dataObject';
// import { addresses } from '../../utilities/config';
import { useDispatch, useSelector } from 'react-redux';
import {
  setApiOrigin,
  setFlag,
  setinitialload,
  setarticlevideo,
  settopiwithsubtopic,
  setallregion,
} from '../../redux/countries';
import { video_play } from '../../assets';
import { clearFavouriteMenu } from '../../redux/favouriteMenu';
import { IsMobile } from '../../utilities/config';
import { selectCountry } from '../../redux/countries';
import DisplayComponentforheader from './DisplayComponentforheader';

const Root = () => {
  const dispatch = useDispatch();
  const favouriteMenu = useSelector((state) => state?.favouriteMenu);
  const allregion = useSelector((state) => state?.origin?.allregion);
  const selectedMenu = useSelector((state) => state?.origin?.apiOrigin);
  const { pathname } = useLocation();
  const [filteredFavouriteMenu, setFilteredFavouriteMenu] = useState([]);
  const decodedPathname = decodeURIComponent(pathname);

  const addresses = useSelector((state) => state.origin.apiOrigin);
  const { data: settingsInfo, status, error, run } = useAsync({ status: 'pending' });
  const [themeVariant, setThemeVariant] = useTheme('dark'); // 'dark', 'light'
  const [windowHref, setWindowHref] = useState('');

  const [minItem, setMinItem] = useState();

  const navigate = useNavigate();

  const isDesktop = useMediaQuery('width', 1024);
  const themeIcon = getData().themeIcon;
  const toggleTheme = (inputValue, valueOne, valueTwo) => {
    if (inputValue === valueOne) {
      setThemeVariant(valueTwo);
    } else {
      setThemeVariant(valueOne);
    }
  };
  const getBaseUrlFromStorage = () => {
    const storedRegion = localStorage.getItem('selectedRegion');
    var parsedRegion = storedRegion ? JSON.parse(storedRegion) : null;
    return parsedRegion ? parsedRegion.hostName : null;
  };
  const handleOrigin = (e, id) => {
    e.preventDefault();
    dispatch(selectCountry(id));
    // dispatch(clearFavouriteMenu());
  };
  if (IsMobile) {
    useEffect(() => {

      const x = setInterval(() => {
        const x = scrollableDivRef.current?.scrollLeft;
        let min_dist = Infinity;
        let min_item = Infinity;
        let y = 0;
        for (let index = 0; index < scrollableDivRef.current?.children.length; index++) {
          const element = scrollableDivRef.current?.children[index];
          y += element.scrollWidth;
          let thisDistance = Math.abs(x - y);
          if (thisDistance < min_dist) {
            min_dist = thisDistance;
            min_item = index;
          }
        }
        if (minItem != min_item ) {
          // alert(minItem)
          console.log(min_item);

          ScrollToActiveTab(min_item);
          // setMinItem(min_item);
          // navigate(filteredFavouriteMenu?.[min_item]?.link, {
          //   state: filteredFavouriteMenu?.[min_item]?.state,
          // });
        } // if(minItem!=undefined)ScrollToActiveTab(minItem)
      }, 1500);

      return ()=>clearInterval(x)
    }, []);

    useEffect(() => {
      const apiUrl = `${RootUrl.Baseurl}api/Region/GetRegion`;
      fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          console.log('All Region', data.data);
          const dynamicData = data.data;
          dispatch(setallregion(data.data));
        })
        .catch((err) => {
          console.log('Error From Dummy Request', err);
        });
    }, []);
  }

  useEffect(() => {
    // let hostName = window.location.hostname;
    var hostName = getBaseUrlFromStorage();
    if (hostName === null || hostName === undefined) {
      hostName = RootUrl.HostName;
    }
    fetchGetFunction(
      // `https://www.sportspotengland.dev`
      // `http://208.109.188.83:8042/api/Region/GetRegionByHostName?hostName=localhost`
      `${RootUrl.Baseurl}api/Region/GetRegionByHostName?hostName=${hostName}`
    )
      .then((res) => {
        console.log('Responce From Dummy Request ', res);
        dispatch(setApiOrigin(res?.data));
        // dispatch(clearFavouriteMenu());
      })
      .catch((err) => {
        console.log('Error From Dummy Request ', err);
      });
  }, []);
  useEffect(() => {
    if (addresses.hostName != null) {
      const settingsPromise = fetchConfig(`${addresses.baseUrlApi}`, addresses.id);
      setWindowHref(`${addresses.baseUrl}`);
      run(settingsPromise);
    }
  }, [addresses]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // console.log('sss',settingsInfo)
    if (settingsInfo) {
      dispatch(setFlag(settingsInfo?.url));
      dispatch(settopiwithsubtopic(settingsInfo?.menuItems));

      const subTopicIds = settingsInfo?.menuItems.flatMap((item) =>
        item.subTopics.map((subtopic) => subtopic.subTopicID)
      );
      const filteredMenu = favouriteMenu.filter((item) =>
        subTopicIds.includes(item.state.SubTopicId)
      );
      setFilteredFavouriteMenu(filteredMenu);
      console.log('filtereremwnu', filteredFavouriteMenu);
      //favouriteMenu
    }
    const foundItems = settingsInfo?.menuItems
      .filter(
        (item) =>
          item.topic &&
          item.subTopics.some(
            (subtopic) => subtopic.keyword.toLowerCase() === addresses.siteKeyword?.toLowerCase()
          )
      )
      .map((item) => {
        const filteredSubTopics = item.subTopics.filter(
          (subtopic) => subtopic.keyword.toLowerCase() === addresses.siteKeyword?.toLowerCase()
        );
        dispatch(setinitialload(filteredSubTopics));
        dispatch(setarticlevideo(filteredSubTopics));
        setVisible(true);
        return { subTopics: filteredSubTopics };
      });
  }, [settingsInfo, favouriteMenu]);

  function ScrollToActiveTab(id) {
    // Get references to the div and the target element
    var scrollableDiv = document.getElementById('scrollableDiv');
    let tempId = 'targetId-' + id;
    var targetElement = document.getElementById(tempId);

    var targetPosition =
      targetElement?.offsetLeft + targetElement?.clientWidth / 2 - window.innerWidth * 0.5;
    console.log('ont', scrollableDiv.scrollLeft, targetPosition);
    // Scroll the div to the target position
    scrollableDiv.scrollLeft = targetPosition;
  }
  const scrollableDivRef = useRef(null);


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
      if (!settingsInfo || typeof settingsInfo.menuItems === 'undefined') {
        // Log or handle the error as you see fit

        return <div> Error: Missing settings information</div>;
      }
      const fullInfo = [settingsInfo, windowHref];
      return (
        <MediaQueryProvider>
          <ThemeQueryProvider value={themeVariant}>
            <div className={'App dark'}>
              <header className={isDesktop ? 'desktop-header' : 'mobile-header'}>
                {isDesktop ? (
                  <div className="main-header desktop">
                    <div className="item-container item-one">
                      <div className="item logo">
                        <Logo name={'Logo'} href="/" alt={'logo'} />
                      </div>
                      <div className="item flag">
                        <Logo name={'Flag'} href="/" alt={'logo'} />{' '}
                        <h2 className="logo-title"></h2>
                      </div>
                    </div>

                    <div className="item-container item-two">
                      <a
                        href="https://www.sportspotnews-landingpage.com/"
                        target="_blank"
                        className="playstore item"></a>

                      <div className="item menu">
                        <NavbarMobile
                          navList={settingsInfo.menuItems}
                          setThemeVariant={setThemeVariant}
                          themeVariant={themeVariant}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="main-header">
                      <div className="item">
                        <NavbarMobile
                          navList={settingsInfo.menuItems}
                          setThemeVariant={setThemeVariant}
                          themeVariant={themeVariant}
                        />
                        {/* <span style={{ fontSize: '30px', cursor: 'pointer' }}>&#9776;</span> */}
                      </div>
                      <div className="item mid-logo">
                        <Logo name={'Logo'} href="/" alt={'logo'} />
                        {/* {IsMobile ? (
                        <div className="c-dropdown">
                          <div class="dropdown">
                            <div
                              class="  dropdown-toggle"
                              type="button"
                              id="dropdownMenuButton1"
                              data-bs-toggle="dropdown"
                              aria-expanded="false">
                              <span>
                                <Logo alt={'logo'} />
                              </span>
                            </div>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                              {allregion?.map((m) => {
                                const isActive = selectedMenu?.id === m?.id;
                                return (
                                  <li
                                    key={m?.id}
                                    className={`dropdown-item text-uppercase ${themeVariant === 'light'
                                        ? isActive
                                          ? 'bg-light active-light'
                                          : 'bg-light'
                                        : isActive
                                          ? 'bg-dark active-dark'
                                          : 'bg-dark'
                                      }`}
                                    onClick={(e) => handleOrigin(e, m?.id)}>
                                    {m?.domainName}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <Logo name={'Flag'} href="/" alt={'logo'} />
                      )} */}
                      </div>
                      <div className="item">
                        {IsMobile ? (
                          <div className="c-dropdown">
                            <div class="dropdown">
                              <div
                                class="  dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton1"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <span>
                                  <Logo alt={'logo'} />
                                </span>
                              </div>
                              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                {allregion?.map((m) => {
                                  const isActive = selectedMenu?.id === m?.id;
                                  return (
                                    <li
                                      key={m?.id}
                                      className={`dropdown-item text-uppercase ${
                                        themeVariant === 'light'
                                          ? isActive
                                            ? 'bg-light active-light'
                                            : 'bg-light'
                                          : isActive
                                          ? 'bg-dark active-dark'
                                          : 'bg-dark'
                                      }`}
                                      onClick={(e) => handleOrigin(e, m?.id)}>
                                      {m?.domainName}
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <Logo name={'Flag'} href="/" alt={'logo'} />
                        )}
                      </div>
                    </div>
                    <div className="header-nav">
                      {IsMobile && visible && <DisplayComponentforheader />}
                    </div>
                  </>
                )}
              </header>
                        
              {/* <Navigation className="nav-main" navList={settingsInfo.MenuItems} /> */}
              <Outlet context={fullInfo} />
            </div>
            <footer>
              <div
                className="top-bar lg-d-none "
                id="scrollableDiv"
                ref={scrollableDivRef}
                // onDragEnd={()=>console.log('DRAG-END')}
                onScroll={() => {
                  // console.log(scrollableDivRef?.current?.children);
                  // (window.width)
                  const x = scrollableDivRef.current?.scrollLeft;
                  let min_dist = Infinity;
                  let min_item = Infinity;
                  let y = 0;
                  for (let index = 0; index < scrollableDivRef.current?.children.length; index++) {
                    const element = scrollableDivRef.current?.children[index];
                    y += element.scrollWidth;
                    let thisDistance = Math.abs(x - y);
                    if (thisDistance < min_dist) {
                      min_dist = thisDistance;
                      min_item = index;
                    }
                  }
                  if (minItem != min_item) {
                    // alert(minItem)
                    console.log(min_item);

                    ScrollToActiveTab(min_item);
                    setMinItem(min_item);
                    navigate(filteredFavouriteMenu[min_item]?.link, {
                      state: filteredFavouriteMenu[min_item]?.state,
                    });
                  }
                  // console.log(min_tem);
                  // ScrollToActiveTab(min_item)
                }}>
                {IsMobile && (
                  // {favouriteMenu?.some(m => m?.name == team?.name)}
                  <>
                     <div style={{ marginRight: '40%' }}>
                    </div>
                    {filteredFavouriteMenu?.map((m, i) => {
                      return (
                        <Link
                          key={i}
                          id={`targetId-${i}`}
                          className={
                            decodedPathname == `/${m?.state?.navType}/${m?.state?.navTopic}`
                              ? 'active tab btn-light active'
                              : 'tab btn-light'
                          }
                          to={m.link}
                          state={m?.state}
                          name={m?.name}
                          onClick={() => ScrollToActiveTab(i)}>
                          {m?.name?.toLowerCase() == 'top news'
                            ? `${m.name} ${m?.state?.moreItemName}`
                            : m?.name}
                        </Link>
                      );
                    })}
                    <div style={{ marginLeft: '40%' }}>
                    </div>
                  </>
                )}
              </div>
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
