import { Link, Outlet, useLocation } from 'react-router-dom';
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
import { useEffect, useState } from 'react';
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

const Root = () => {
  const dispatch = useDispatch();
  const favouriteMenu = useSelector((state) => state?.favouriteMenu);
  const allregion = useSelector((state) => state?.origin?.allregion);
  const selectedMenu = useSelector((state) => state?.origin?.apiOrigin);
  const { pathname } = useLocation();
  const [filteredFavouriteMenu, setFilteredFavouriteMenu] = useState([]);
  console.log('selectedMenu ', selectedMenu);

  const addresses = useSelector((state) => state.origin.apiOrigin);
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
 const getBaseUrlFromStorage=() =>{
    const storedRegion = localStorage.getItem('selectedRegion');
    var parsedRegion = storedRegion ? JSON.parse(storedRegion) : null;
    return parsedRegion ? parsedRegion.hostName : null;
}
  const handleOrigin = (e, id) => {
    e.preventDefault();
    dispatch(selectCountry(id));
    // dispatch(clearFavouriteMenu());
  };
  if (IsMobile) {
    useEffect(() => {
      const authToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6ImVkNzgzZDQ4LTg0NzYtNDIyMi01YmJlLTA4ZGJjYWYzNGE2OSIsIlVzZXJJZCI6ImVkNzgzZDQ4LTg0NzYtNDIyMi01YmJlLTA4ZGJjYWYzNGE2OSIsIkVtYWlsIjoiYWRtaW5Ad2ViLmNvbSIsIm5iZiI6MTcwMDgxMTQ4MSwiZXhwIjoxNzAwOTg0MjgxLCJpYXQiOjE3MDA4MTE0ODEsImlzcyI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzcwLyIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQ0MzcwLyJ9.hqrB76meJoPr_xwQ8nZvtnvsTidzIapbhPlZvFppGIk';
      const apiUrl = `${RootUrl.Baseurl}api/Region/GetRegion`;
      fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      })
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

    // useEffect(() => {
    //   const apiUrl = `${RootUrl.Baseurl}api/Region/GetRegion`;
    //   fetch(apiUrl)
    //     .then((res) => res.json())
    //     .then((data) => {
    //       console.log('All Region', data.data);
    //       const dynamicData = data.data;
    //       dispatch(setallregion(data.data));
    //     })
    //     .catch((err) => {
    //       console.log('Error From Dummy Request', err);
    //     });
    // }, []);
  }

  useEffect(() => {
   // let hostName = window.location.hostname;
    var hostName = getBaseUrlFromStorage();
    if(hostName===null || hostName===undefined){
      hostName=RootUrl.HostName;
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
      console.log('filtereremwnu',filteredFavouriteMenu)
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
        return { subTopics: filteredSubTopics };
      });
  }, [settingsInfo,favouriteMenu]);

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
      if (!settingsInfo || typeof settingsInfo.menuItems === 'undefined') {
        // Log or handle the error as you see fit

        return <div> Error: Missing settings information</div>;
      }
      const fullInfo = [settingsInfo, windowHref];
      return (
        <MediaQueryProvider>
          <ThemeQueryProvider value={themeVariant}>
            <div className={'App dark'}>
              <header>
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
                  <div className="main-header">
                    <div className="item">
                      <NavbarMobile
                        navList={settingsInfo.menuItems}
                        setThemeVariant={setThemeVariant}
                        themeVariant={themeVariant}
                      />
                      {/* <span style={{ fontSize: '30px', cursor: 'pointer' }}>&#9776;</span> */}
                    </div>
                    <div className="item">
                      <Logo name={'Logo'} href="/" alt={'logo'} />
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
                )}
                <div className="top-bar lg-d-none" id="scrollableDiv">
                  {IsMobile &&
                    // {favouriteMenu?.some(m => m?.name == team?.name)}
                    filteredFavouriteMenu?.map((m, i) => {
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

                          {/* {pathname == `/${m?.state?.navType}/${m?.state?.navTopic}` && (
                          <img className=" imgg" src={video_play} alt={`${m?.name} logo`} />
                        )} */}
                        </Link>
                      );
                    })}
                </div>
              </header>

              {/* <Navigation className="nav-main" navList={settingsInfo.MenuItems} /> */}
              <Outlet context={fullInfo} />
            </div>
            <footer>
              <a
                href="https://www.sportspotnews-landingpage.com/"
                target="_blank"
                className="footer-img footer"></a>
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
