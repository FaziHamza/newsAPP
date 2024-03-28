import { Link, Outlet, useLocation, useNavigate, useMatch } from 'react-router-dom';
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
import { addCurrentMenu } from '../../redux/CurrentMenu';
import {
  setApiOrigin,
  setFlag,
  setinitialload,
  setarticlevideo,
  settopiwithsubtopic,
  setallregion,
} from '../../redux/countries';
import { video_play, settingicon, backbtn, shareicon } from '../../assets';
import { clearFavouriteMenu } from '../../redux/favouriteMenu';
import { IsMobile } from '../../utilities/config';
import { selectCountry } from '../../redux/countries';
import DisplayComponentforheader from './DisplayComponentforheader';
import SettingNavbar from './SettingNavbar';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { debounce } from 'lodash';

const Root = () => {
  
  


  const dispatch = useDispatch();
  //For Header back Button
  // Define the route pattern you want to match
  const targetRoutePattern1 = '/:type/:topic/:id';
  const targetRoutePattern2 = 'podcast';
  const targetRoutePattern3 = 'videohighlights';
  const targetRoutePattern4 = 'highlights';

  const isMatchingRoute1 = useMatch(targetRoutePattern1);
  const isMatchingRoute2 = useMatch(targetRoutePattern2);
  const isMatchingRoute3 = useMatch(targetRoutePattern3);
  const isMatchingRoute4 = useMatch(targetRoutePattern4);
  const [colorState, setColorState] = useState({});
  const [cacheState, setCacheState] = useState({});
  const [CurrentMenuItemSelected, SetCurrentMenuItemSelected] = useState();
  const favouriteMenu = useSelector((state) => state?.favouriteMenu);
  const allregion = useSelector((state) => state?.origin?.allregion);
  const selectedMenu = useSelector((state) => state?.origin?.apiOrigin);
  const { pathname } = useLocation();
  const [filteredFavouriteMenu, setFilteredFavouriteMenu] = useState([]);
  const [filteredFavouriteMenuId, setFilteredFavouriteMenuId] = useState([]);

  const decodedPathname = decodeURIComponent(pathname);

  const addresses = useSelector((state) => state.origin.apiOrigin);
  const { data: settingsInfo, status, error, run } = useAsync({ status: 'pending' });
  const [themeVariant, setThemeVariant] = useTheme('dark'); // 'dark', 'light'
  const [windowHref, setWindowHref] = useState('');

  const [minItem, setMinItem] = useState();


  // ====== slider ====
  const [activeTabIndex, setActiveTabIndex] = useState(
    localStorage.getItem('activeTabIndex') ? 
  parseInt(localStorage.getItem('activeTabIndex')) : 0
  );
  const sliderRef = useRef(null);
  const settings = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToScroll: 1,
    centerMode: true, 
    variableWidth: true,
    swipe :true,
    swipeToSlide : true,
    cssEase: 'linear',
    
   
  
    beforeChange:(currentSlide, index) => {
      setActiveTabIndex(index); 
      handleTabChange(index)
      localStorage.setItem('activeTabIndex', index);
      ScrollToActiveTab(filteredFavouriteMenu[index], index, true);

      var namee = decodeURIComponent(window.location.pathname.split('/news/')[1]);
     
      let indexxx = favouriteMenu.findIndex(item => decodeURIComponent(item.state.navTopic.toString().toLowerCase()) == namee.toString().toLowerCase());

      console.log("favouriteMenu" , indexxx);
        if (indexxx !== -1) {
          setActiveTabIndex(indexxx);
          handleTabChange(indexxx)
          localStorage.setItem('activeTabIndex', indexxx);
          ScrollToActiveTab(filteredFavouriteMenu[indexxx], indexxx, true);
          sliderRef.current.slickGoTo(indexxx);

        }

    },
  };
  
  useEffect(()=>{
    const namee = decodeURIComponent(window.location.pathname.split('/news/')[1]);
    
    
    console.log("nameee" , namee);
    let indexxx = filteredFavouriteMenu?.findIndex(item => decodeURIComponent(item.name.toString().toLowerCase()) == namee.toString().toLowerCase());
    
      if (indexxx !== -1) {
        setActiveTabIndex(indexxx);
        handleTabChange(indexxx)
        localStorage.setItem('activeTabIndex', indexxx);
        ScrollToActiveTab(filteredFavouriteMenu[indexxx], indexxx, true);
        sliderRef.current.slickGoTo(indexxx);
        
      }

  },[]);

    // ======== tab history =======

    // const [tabHistory, setTabHistory] = useState(
    //   localStorage.getItem('tabHistory') ? JSON.parse(localStorage.getItem('tabHistory')) : []
    // );
  
  
    // const handleTabChange = (index) => {
    //   setActiveTabIndex(index);
    //   const updatedTabHistory = [...tabHistory, index];
    //   setTabHistory(updatedTabHistory);
    //   localStorage.setItem('activeTabIndex', index);
    //   localStorage.setItem('tabHistory', JSON.stringify(updatedTabHistory));
    // };
  
    // const handleBackButton = () => {
    //   const updatedTabHistory = [...tabHistory];
    //   updatedTabHistory.pop();
    //   const lastIndex = updatedTabHistory.pop(); 
    //   setTabHistory(updatedTabHistory);
    //   setActiveTabIndex(lastIndex);
    //   localStorage.setItem('activeTabIndex', lastIndex);
    //   localStorage.setItem('tabHistory', JSON.stringify(updatedTabHistory));
    // };
  
  
    // useEffect(() => {
    //   const handlePopState = () => {
    //     handleBackButton();
    //   };
    //   window.addEventListener('popstate', handlePopState);
    //   return () => {
    //     window.removeEventListener('popstate', handlePopState);
    //   };
    // }, [tabHistory]);


    //  the commented code not remove tabhistory after close the window 

    // but the lower code is removing the tab histroy after refresh
    const [tabHistory, setTabHistory] = useState(
      localStorage.getItem('tabHistory') ? JSON.parse(localStorage.getItem('tabHistory')) : []
    );
  
    const handleTabChange = (index) => {
      setActiveTabIndex(index);
      const updatedTabHistory = [...tabHistory, index];
      setTabHistory(updatedTabHistory);
      localStorage.setItem('activeTabIndex', index);
      localStorage.setItem('tabHistory', JSON.stringify(updatedTabHistory));
    };
  
    const handleBackButton = () => {
      const updatedTabHistory = [...tabHistory];
      updatedTabHistory.pop(); // Remove the last index from history
      const lastIndex = updatedTabHistory.pop(); // Get the previous index
      setTabHistory(updatedTabHistory);
      setActiveTabIndex(lastIndex);
      localStorage.setItem('activeTabIndex', lastIndex);
      localStorage.setItem('tabHistory', JSON.stringify(updatedTabHistory));
    };
  
    const handleWindowClose = () => {
      // Clear tab history from localStorage when the window is closed
      localStorage.removeItem('tabHistory');
    };
  
    useEffect(() => {
      const handlePopState = () => {
        handleBackButton();
      };
  
      // Add event listener for the popstate event
      window.addEventListener('popstate', handlePopState);
  
      // Add event listener for the unload event
      window.addEventListener('unload', handleWindowClose);
  
      // Clean up event listeners when the component unmounts
      return () => {
        window.removeEventListener('popstate', handlePopState);
        window.removeEventListener('unload', handleWindowClose);
      };
    }, [tabHistory]);


  const handleTabClick = (index) => {
    setActiveTabIndex(index);
    localStorage.setItem('activeTabIndex', index);
    sliderRef.current.slickGoTo(index);
  };

    useEffect(() => {
    if (sliderRef.current) {
      console.log(activeTabIndex);
      sliderRef.current.slickGoTo(activeTabIndex);
    }
  }, [sliderRef.current ,activeTabIndex]);





  // === slider end ===
  const navigate = useNavigate();

  const copyToClipboardV1 = () => {
    const headline = 'SportBlitz News';
    const articleText = document.getElementById('article-headline').innerText;
    const articleLink = window.location.href; // Replace with your article link

    // Create a text version of what you want to copy
    const textToCopy = `Check out this article: ${headline}\n\n${articleText}\nRead more: ${articleLink}`;

    // Use the Clipboard API to copy the text to the clipboard
    navigator.clipboard
      .writeText(textToCopy)
      .then(function () {
        alert('Article information copied to clipboard!');
      })
      .catch(function (error) {
        alert('Error copying to clipboard: ' + error);
      });

    // Call the function to draw the image with the headline overlay
    drawImageWithHeadline();
  };
  const drawImageWithHeadline = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 600; // Adjust as needed
    canvas.height = 400; // Adjust as needed
    const imgElement = document.getElementById('articalImageMobileView');
    let base64String;
    convertImageToBase64(imgElement.src, function (base64) {
      // This will log the base64 string to the console
      base64String = base64;
      const image = new Image();
      image.src = imgElement.src;

      // This is a shortened placeholder base64 string; replace with actual data
      // image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAcAAAAGzCAYAAAC4k8ccAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAP+lSURBVHhe7L11mFTXuu19zzl77yQEd+hGWqHdoAUadydIcPcGunF3d3eXxt3dPRBBQ0JCdPs++9z7fX/dv8Y3xlw1q1cXhSTbON9JP8941lpzSVVXw/zVeOf7zvm/8MvPLz+5ErkJggg==';
      image.src = base64String;
      image.onload = function () {
        // Draw the image onto the canvas
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        // const base64Image = canvas.toDataURL('image/png');
        // function wrapText(context, text, maxWidth, lineHeight, x, y) {
        //   let words = text.split(' ');
        //   let line = '';
        //   let yOffset = 0;

        //   for (let i = 0; i < words.length; i++) {
        //     let testLine = line + words[i] + ' ';
        //     let metrics = context.measureText(testLine);
        //     let testWidth = metrics.width;

        //     if (testWidth > maxWidth && i > 0) {
        //       context.fillText(line, x, y + yOffset);
        //       line = words[i] + ' ';
        //       yOffset += lineHeight;
        //     } else {
        //       line = testLine;
        //     }
        //   }

        //   context.fillText(line, x, y + yOffset);
        // }
        // Draw the semi-transparent rectangle
        const rectHeight = 60; // Adjust as needed
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillRect(0, canvas.height - rectHeight, canvas.width, rectHeight);

        // Draw the headline text
        ctx.font = '20px Arial'; // Adjust as needed
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        const headline = document.getElementById('article-headline').innerText;
        const secondLine = document.getElementById('article-photographyBy').innerText;

        //for text should be next line if long
        // const lineHeight = 25; // Adjust as needed, it represents the height of each line
        // const totalTextHeight = lineHeight * 2; // Assuming two lines of text
        // const startY = canvas.height - rectHeight / 2 - totalTextHeight / 2;
        // wrapText(ctx, headline, canvas.width, lineHeight, canvas.width / 2, startY);

        ctx.fillText(headline, canvas.width / 2, canvas.height - rectHeight / 2);
        ctx.font = '10px Arial';
        ctx.textAlign = 'right';
        const lineHeight = 20;
        ctx.fillText(secondLine, canvas.width - 5, canvas.height - rectHeight / 2 + lineHeight);
        // Convert the canvas to a Blob
        canvas.toBlob(function (blob) {
          // Use the Clipboard API to copy the blob to the clipboard
          navigator.clipboard
            .write([new ClipboardItem({ 'image/png': blob })])
            .then(function () {
              alert('Image copied to clipboard!');
            })
            .catch(function (error) {
              alert('Error copying image to clipboard: ' + error);
            });
        }, 'image/png');
      };
    });
    // Create a new image object for the base64 encoded image
  };

  const convertImageToBase64 = (url, callback) => {
    var img = new Image();
    img.crossOrigin = 'Anonymous'; // This enables cross-origin access for the image

    img.onload = function () {
      var canvas = document.createElement('canvas');
      var ctx = canvas.getContext('2d');
      canvas.height = this.naturalHeight;
      canvas.width = this.naturalWidth;
      ctx.drawImage(this, 0, 0);

      var dataURL = canvas.toDataURL('image/jpeg');
      callback(dataURL);
    };

    img.onerror = function () {
      callback(null);
    };

    img.src = url;
    // This is needed to handle CORS issues
    if (img.complete || img.complete === undefined) {
      img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
      img.src = url;
    }
  };

  const shareContent = async () => {
    const user = new URLSearchParams(window.location.search).get('user');
    if (user === 'admin') {
      localStorage.setItem('user', user);
    }
    const storedUser = localStorage.getItem('user');
    if (user === 'admin' || storedUser === 'admin') {
      copyToClipboardV1();
    } else {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Atricle',
            // text: articleInfo[0]._title,
            url: window.location.href,
          });
        } catch (error) {
          console.error('Error sharing:', error);
          alert(error);
        }
      } else {
        // alert('Web Share API is not supported in this browser. You can manually share the link.');
        copyToClipboard(window.location.href);
      }
    }
  };
  const copyToClipboard = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    alert('URL copied to clipboard!');
  };
  const ConfirmationforclearStorage = (items) => {
    // const ClearStorage = (items) => {
    //   // Your logic to clear storage
    //   // console.log'Storage cleared');
    //   setCustomAlertOpen(false); // Close the custom alert
    // };

    confirmAlert({
      customUI: ({ onClose }) => (
        <CustomConfirmation
          title="Confirm to submit"
          message="Are you sure you want to Clear Cache?"
          onConfirm={() => {
            ClearStorage(items);
            onClose();
            // closeNav()
          }}
          onCancel={() => {
            onClose();
          }}
        />
      ),
    });
  };




  const CustomConfirmation = ({ title, message, onConfirm, onCancel }) => {
    return (
      <div className="custom-alert">
        <div className="custom-alert-content">
          <h1>{title}</h1>
          <p>{message}</p>
          <div className="button-container">
            <button className="confirm-button" onClick={onConfirm}>
              Yes
            </button>
            <button className="cancel-button" onClick={onCancel}>
              No
            </button>
          </div>
        </div>
      </div>
    );
  };
  const ClearStorage = (items) => {
    dispatch(clearFavouriteMenu(items));
  };
  const isDesktop = useMediaQuery('width', 1024);
  const themeIcon = getData().themeIcon;
  // const toggleTheme = (inputValue, valueOne, valueTwo) => {
  //   if (inputValue === valueOne) {
  //     setThemeVariant(valueTwo);
  //   } else {
  //     setThemeVariant(valueOne);
  //   }
  // };
  const toggleTheme = () => {
    if (themeVariant === 'light') {
      setThemeVariant('dark');
    } else {
      setThemeVariant('light');
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
 
  useEffect(() => {
    const apiUrl = `${RootUrl.Baseurl}api/Region/GetRegion`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        // console.log'All Region', data.data);
        const dynamicData = data.data;
        dispatch(setallregion(data.data));
      })
      .catch((err) => {
        // console.log'Error From Dummy Request', err);
      });
  }, []);
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
        // console.log'Responce From Dummy Request ', res);
        dispatch(setApiOrigin(res?.data));
        // dispatch(clearFavouriteMenu());
      })
      .catch((err) => {
        // console.log'Error From Dummy Request ', err);
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
    // // console.log'sss',settingsInfo)
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
      // console.log'filtereremwnu', filteredFavouriteMenu);
      const filteredMenuIds = favouriteMenu
        .filter((item) => subTopicIds.includes(item.state.SubTopicId))
        .map((item) => item.state.SubTopicId);
      setFilteredFavouriteMenuId(filteredMenuIds);

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

  function ScrollToActiveTab(item, id, useraction) {
    setActiveTabIndex(id);
   
    if (item !== null && item !== undefined && useraction) {
      dispatch(addCurrentMenu(item));
    }

    navigate(  filteredFavouriteMenu[id]?.state?.IsExternal ? `/external?isExternal=true&ArticleLink=${filteredFavouriteMenu[id]?.state?.ExternalUrl}&Logo=${filteredFavouriteMenu[id]?.state?.LogoTeam}&Text=${filteredFavouriteMenu[id]?.state?.topicName}` : filteredFavouriteMenu[id]?.link, {
      state: filteredFavouriteMenu[id]?.state,
    });

    
  }

  const scrollableDivRef = useRef(null);

  const location = useLocation();
  const { state } = location;
  const teamName = state?.topicName;

  // console.log'TEAMNAMW', state?.topicName);
  const currentmenu = window.localStorage.getItem('favouriteMenu');
  const currentmenuparse = JSON.parse(currentmenu);
  if (
    state?.topicName === undefined &&
    Array.isArray(currentmenuparse) &&
    currentmenuparse != null &&
    currentmenuparse.length !== 0 &&
    CurrentMenuItemSelected == undefined
  ) {
    const parse = JSON.parse(currentmenu);
    SetCurrentMenuItemSelected(parse[0]?.state.topicName);
  }
  const regionjson = useSelector((state) => state.origin.apiOrigin.regionJson);
  const jsonArray = JSON.parse(regionjson);

  useEffect(() => {
    // Ensure regionjson is an array
    if (Array.isArray(jsonArray)) {
      // Filter and set state based on "type"
      const colorObject = jsonArray.find((item) => item.type === 'color');
      const cacheObject = jsonArray.find((item) => item.type === 'cache');

      if (colorObject) setColorState(colorObject);
      if (cacheObject) setCacheState(cacheObject);
    }
  }, [allregion]);
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
                        {isMatchingRoute1 !== null ||
                        isMatchingRoute2 !== null ||
                        isMatchingRoute3 !== null ||
                        isMatchingRoute4 !== null ? (
                          <img
                            src={backbtn}
                            style={{ height: '35px' }}
                            onClick={() => navigate(-1)}
                          />
                        ) : (
                          <NavbarMobile
                            navList={settingsInfo.menuItems}
                            setThemeVariant={setThemeVariant}
                            // themeVariant={themeVariant}
                            themeVariant={'dark-theme'}
                          />
                        )}
                        {/* <span style={{ fontSize: '30px', cursor: 'pointer' }}>&#9776;</span> */}
                      </div>
                      <div className="item mid-logo">
                        <Logo name={'Logo'} href="/" alt={'logo'} />
                      </div>
                      <div className="item">
                        {
                          IsMobile && isMatchingRoute1 == null && (
                            <>
                              <div className="coll-item-inner">
                                <div className="nav-item">
                                  {/* <div className="flx">Setting</div> */}
                                  <div className="c-dropdown">
                                    <div className="dropdown">
                                      <div
                                        className="  dropdown-toggle"
                                        type="button"
                                        id="dropdownMenuButton1"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <span>
                                          {/* <Logo alt={'logo'} /> */}
                                          <img
                                            src={settingicon}
                                            alt=""
                                            srcSet=""
                                            style={{ height: '35px', width: '35px' }}
                                          />
                                        </span>
                                      </div>
                                      <ul
                                        className="dropdown-menu"
                                        aria-labelledby="dropdownMenuButton1">
                                        {/* {allregion?.map((m) => {
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
                                        })} */}
                                        <li className="dropdown-item text-uppercase bg-light">
                                          {colorState.value && (
                                            <div className="coll-item-inner">
                                              <div
                                                className="nav-item"
                                                style={{
                                                  display: 'flex',
                                                  justifyContent: 'space-between',
                                                  alignItems: 'center',
                                                }}>
                                                <div
                                                  className="flx"
                                                  style={{ marginRight: '10px' }}>
                                                  {colorState.name}
                                                </div>

                                                <i
                                                  className={colorState.icon}
                                                  onClick={() => toggleTheme('switch')}
                                                />
                                              </div>
                                            </div>
                                          )}
                                        </li>
                                        <li className="dropdown-item text-uppercase bg-light">
                                          {cacheState.value && (
                                            <div className="coll-item-inner">
                                              <div
                                                className="nav-item"
                                                style={{
                                                  display: 'flex',
                                                  justifyContent: 'space-between',
                                                  alignItems: 'center',
                                                }}>
                                                <div
                                                  className="flx"
                                                  style={{ marginRight: '10px' }}>
                                                  {cacheState.name}
                                                </div>
                                                <i
                                                  className={cacheState.icon}
                                                  onClick={() =>
                                                    ConfirmationforclearStorage(
                                                      filteredFavouriteMenuId
                                                    )
                                                  }></i>
                                              </div>
                                            </div>
                                          )}
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )
                          // : (
                          //   <Logo name={'Flag'} href="/" alt={'logo'} />
                          // )
                        }
                        {/* <SettingNavbar
                          navList={settingsInfo.menuItems}
                          setThemeVariant={setThemeVariant}
                          themeVariant={themeVariant}
                        /> */}
                        {IsMobile && isMatchingRoute1 !== null && (
                          <img
                            src={shareicon}
                            alt={shareicon}
                            onClick={shareContent}
                            srcSet=""
                            style={{ height: '35px', width: '35px' }}
                          />
                        )}
                      </div>
                    </div>
                    {/* <div className="header-nav">
                      {IsMobile && visible && <DisplayComponentforheader />}
                    </div> */}
                  </>
                )}
              </header>

              {/* <Navigation className="nav-main" navList={settingsInfo.MenuItems} /> */}
              <Outlet context={fullInfo} />
            </div>
            <footer>
              <div className="top-bar lg-d-none">
                <div className="curve"></div>

                {/* ====== slicl slider ========== */}
                <div className="all-tabs" id="scrollableDiv" ref={scrollableDivRef} >
                  {IsMobile && (
                    <>
                      <Slider {...settings} ref={sliderRef} >
                        
                        {filteredFavouriteMenu?.map((m, i) => {
                          
                          return (
                            
                        
                           <div
                              key={i}
                              id={`targetId-${i}`}
                              className={i == activeTabIndex ? 'active tab btn-light' : 'tab btn-light'}
                              to={m.link}
                              name={m?.name}
                              onClick={() => {
                                ScrollToActiveTab(m, i, true);
                                handleTabClick(i)
                              }}>
                              <span className="action-bar">
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
                              </span>

                              {m?.state?.isSubTopicChecked ? (
                                <span style={{ visibility: 'hidden' }}>SPACE</span>
                              ) : (
                                <span>{m?.name}</span>
                              )}
                            </div>
                         
                        
                            
                          );
                        })}
                      
                      </Slider>

                    </>
                  )}
                </div>

                {/* =========== slick slider end ======= */}
              </div>
            </footer>

            {/* <footer>
              <div
                className="top-bar lg-d-none"
                >
                <div className="curve"></div>
                <div className="all-tabs" 
                 id="scrollableDiv"
                ref={scrollableDivRef}
                // onDragEnd={()=>// console.log'DRAG-END')}
                onScroll={() => {
                  // // console.logscrollableDivRef?.current?.children);
                  // (window.width)
                  const x = scrollableDivRef.current?.scrollLeft;
                  let min_dist = Infinity;
                  let min_item = Infinity;
                  let y = 0;
                  for (let index = 0; index < filteredFavouriteMenu.length; index++) {
                    const element = scrollableDivRef.current?.children[index];
                    y += element.scrollWidth;
                    let thisDistance = Math.abs(x - y);
                    if (thisDistance < min_dist) {
                      min_dist = thisDistance;
                      min_item = index;
                    }
                  }
                  if (minItem != min_item && min_item != Infinity) {
                    // alert(minItem)
                    // console.logmin_item);

                    // ScrollToActiveTab(min_item);
                    setMinItem(min_item);
                    navigate(filteredFavouriteMenu[min_item]?.link, {
                      state: filteredFavouriteMenu[min_item]?.state,
                    });
                  }
                  // // console.logmin_tem);
                  // ScrollToActiveTab(min_item)
                }}>
                  {IsMobile && (
                    <>
                      <div style={{ marginRight: '40%' }}></div>
                      {filteredFavouriteMenu?.map((m, i) => {
                        return (
                          <Link
                            key={i}
                            id={`targetId-${i}`}
                            className={
                              decodedPathname == `/${m?.state?.navType}/${m?.state?.navTopic}`
                                ? 'active tab btn-light '
                                : 'tab btn-light'
                            }
                            to={m.link}
                            state={m?.state}
                            name={m?.name}
                            onClick={() => ScrollToActiveTab(i)}>
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
                          </Link>
                        );
                      })}
                      <div style={{ marginLeft: '40%' }}></div>
                    </>
                  )}
                </div>
              </div>
            </footer> */}
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
