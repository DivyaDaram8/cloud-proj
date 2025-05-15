/* Customizer.jsx */
import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { ColorPicker, Tab } from '../components';

const Customizer = () => {
  const snap = useSnapshot(state);
  // console.log(snap.shirtText);
  // const [file, setFile] = useState('');
  const [activeEditorTab, setActiveEditorTab] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
    textLines: false, // new filter tab for text
  });

  const editorTabRef = useRef(null);
useEffect(() => {
  if (state.image) {
    state.logoDecal = state.image;
    state.isLogoTexture = true;
  }
}, [state.image]);
useEffect(() => {
  if (state.image) {
    state.fullDecal = state.image;
    state.isFullTexture = true;
  }
}, [state.image]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editorTabRef.current && !editorTabRef.current.contains(event.target)) {
        setActiveEditorTab('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key.toLowerCase() === 'q') {
        state.intro = true;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />;
      default:
        return null;
    }
  };

  const handleTabClick = (tabName) => {
    setActiveEditorTab((prev) => (prev === tabName ? '' : tabName));
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case 'logoShirt':
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case 'stylishShirt':
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      case 'textLines':
        state.showText = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        state.showText = false;
    }

    setActiveFilterTab((prev) => ({
      ...prev,
      [tabName]: !prev[tabName],
    }));
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div key="custom" className="absolute top-0 left-0 z-10" {...slideAnimation('left')}>
            <div className="flex items-center min-h-screen" ref={editorTabRef}>
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab key={tab.name} tab={tab} handleClick={() => handleTabClick(tab.name)} />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div className="filtertabs-container" {...slideAnimation('up')}>
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}

            <button className="download-btn" onClick={downloadCanvasToImage}>
              <img src={download} alt="Download Image" className="w-3/5 h-3/5 object-contain" />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;