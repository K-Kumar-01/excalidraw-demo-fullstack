/* eslint-disable @next/next/no-img-element */
import { useEffect, useState, useRef, FC, ReactElement, Fragment } from 'react';

import type ExcalidrawImperativeAPI from '@excalidraw/excalidraw/types/components/App';
import type { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types';
import {
  AppState,
  ExcalidrawProps,
  SceneData,
} from '@excalidraw/excalidraw/types/types';
import axios from 'axios';
import { setIntervalAsync } from 'set-interval-async/dynamic';
import { clearIntervalAsync } from 'set-interval-async';

import InitialData from '../data';

const renderTopRightUI = () => {
  return (
    <button onClick={() => alert('This is dummy top right UI')}>
      {' '}
      Click me{' '}
    </button>
  );
};

const renderFooter = () => {
  return (
    <button onClick={() => alert('This is dummy footer')}>
      {' '}
      custom footer{' '}
    </button>
  );
};

const App: FC = (): ReactElement => {
  const excalidrawRef = useRef<ExcalidrawImperativeAPI>(null);

  const [viewModeEnabled, setViewModeEnabled] = useState(false);
  const [zenModeEnabled, setZenModeEnabled] = useState(false);
  const [gridModeEnabled, setGridModeEnabled] = useState(false);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [canvasUrl, setCanvasUrl] = useState<string | null>(null);
  const [exportWithDarkMode, setExportWithDarkMode] = useState<boolean>(false);
  const [shouldAddWatermark, setShouldAddWatermark] = useState<boolean>(false);
  const [theme, setTheme] = useState<ExcalidrawProps['theme']>('light');
  const [excalidrawExportFns, setexcalidrawExportFns] = useState<any>(null);

  const [Comp, setComp] = useState<any>(null);
  useEffect(() => {
    import('@excalidraw/excalidraw').then((comp) => setComp(comp.default));
  }, []);

  const extractImageFromScene = async () => {
    return await excalidrawExportFns.exportToSvg({
      elements: excalidrawRef.current!.getSceneElements(),
      appState: {
        ...InitialData.appState,
        exportWithDarkMode,
        //@ts-ignore
        shouldAddWatermark,
      },
    });
  };

  const saveImageToBackend = async () => {
    try {
      const result = await extractImageFromScene();
      const saveImgResult = await axios.post('/api/image', {
        name: new Date().getTime().toString(),
        svgString: JSON.stringify(result.outerHTML),
      });
      console.log(saveImgResult);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    let saveImageFrequently: any;
    if (excalidrawExportFns) {
      console.log('Hello');
      saveImageFrequently = setIntervalAsync(saveImageToBackend, 10000);
    }
    return () => {
      clearIntervalAsync(saveImageFrequently)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    };
  }, [excalidrawExportFns]);

  useEffect(() => {
    const onHashChange = () => {
      const hash = new URLSearchParams(window.location.hash.slice(1));
      const libraryUrl = hash.get('addLibrary');
      if (libraryUrl) {
        //@ts-ignore
        excalidrawRef.current!.importLibrary(libraryUrl, hash.get('token'));
      }
    };
    window.addEventListener('hashchange', onHashChange, false);
    return () => {
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  const updateScene = () => {
    const sceneData: SceneData = {
      elements: [
        {
          type: 'rectangle',
          version: 141,
          versionNonce: 361174001,
          isDeleted: false,
          id: 'oDVXy8D6rom3H1-LLH2-f',
          fillStyle: 'hachure',
          strokeWidth: 1,
          strokeStyle: 'solid',
          roughness: 1,
          opacity: 100,
          angle: 0,
          x: 100.50390625,
          y: 93.67578125,
          strokeColor: '#c92a2a',
          backgroundColor: 'transparent',
          width: 186.47265625,
          height: 141.9765625,
          seed: 1968410350,
          groupIds: [],
          strokeSharpness: 'round',
          boundElementIds: null,
        },
      ],
      appState: {
        viewBackgroundColor: '#edf2ff',
      },
    };
    //@ts-ignore
    excalidrawRef.current!.updateScene(sceneData);
  };

  useEffect(() => {
    import('@excalidraw/excalidraw').then((module) =>
      setexcalidrawExportFns({
        exportToSvg: module.exportToSvg,
        exportToCanvas: module.exportToCanvas,
        exportToBlob: module.exportToBlob,
      })
    );
  }, []);

  return (
    <Fragment>
      {!Comp ? (
        <div>Hello</div>
      ) : (
        <div className="App">
          <h1> Excalidraw Example</h1>
          <div className="button-wrapper">
            <button className="update-scene" onClick={updateScene}>
              Update Scene
            </button>
            <button
              className="reset-scene"
              onClick={() => {
                //@ts-ignore
                excalidrawRef.current!.resetScene();
              }}
            >
              Reset Scene
            </button>
            <label>
              <input
                type="checkbox"
                checked={viewModeEnabled}
                onChange={() => setViewModeEnabled(!viewModeEnabled)}
              />
              View mode
            </label>
            <label>
              <input
                type="checkbox"
                checked={zenModeEnabled}
                onChange={() => setZenModeEnabled(!zenModeEnabled)}
              />
              Zen mode
            </label>
            <label>
              <input
                type="checkbox"
                checked={gridModeEnabled}
                onChange={() => setGridModeEnabled(!gridModeEnabled)}
              />
              Grid mode
            </label>
            <label>
              <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={() => {
                  let newTheme: 'light' | 'dark' = 'light';
                  if (theme === 'light') {
                    newTheme = 'dark';
                  }
                  setTheme(newTheme);
                }}
              />
              Switch to Dark Theme
            </label>
          </div>
          <div className="excalidraw-wrapper">
            <Comp
              //@ts-ignore
              ref={excalidrawRef}
              //@ts-ignore
              InitialData={InitialData}
              onChange={(
                elements: readonly ExcalidrawElement[],
                state: AppState
              ) => console.log('Elements :', elements, 'State : ', state)}
              onCollabButtonClick={() =>
                window.alert('You clicked on collab button')
              }
              viewModeEnabled={viewModeEnabled}
              zenModeEnabled={zenModeEnabled}
              gridModeEnabled={gridModeEnabled}
              theme={theme}
              name="Custom name of drawing"
              renderFooter={renderFooter}
              renderTopRightUI={renderTopRightUI}
            />
          </div>
          <div className="export-wrapper button-wrapper">
            <label className="export-wrapper__checkbox">
              <input
                type="checkbox"
                checked={exportWithDarkMode}
                onChange={() => setExportWithDarkMode(!exportWithDarkMode)}
              />
              Export with dark mode
            </label>
            <label className="export-wrapper__checkbox">
              <input
                type="checkbox"
                checked={shouldAddWatermark}
                onChange={() => setShouldAddWatermark(!shouldAddWatermark)}
              />
              Add Watermark
            </label>
            {excalidrawExportFns && (
              <Fragment>
                <button
                  onClick={async () => {
                    const svg = await excalidrawExportFns.exportToSvg({
                      elements: excalidrawRef.current!.getSceneElements(),
                      appState: {
                        ...InitialData.appState,
                        exportWithDarkMode,
                        //@ts-ignore
                        shouldAddWatermark,
                      },
                    });
                    // console.log(svg.outerHTML);
                    document.querySelector('.export-svg')!.innerHTML =
                      svg.outerHTML;
                  }}
                >
                  Export to SVG
                </button>
                <div className="export export-svg"></div>

                <button
                  onClick={async () => {
                    const blob = await excalidrawExportFns.exportToBlob({
                      elements: excalidrawRef.current!.getSceneElements(),
                      mimeType: 'image/png',
                      appState: {
                        ...InitialData.appState,
                        exportWithDarkMode,
                        //@ts-ignore
                        shouldAddWatermark,
                      },
                    });
                    setBlobUrl(window.URL.createObjectURL(blob));
                  }}
                >
                  Export to Blob
                </button>
                <div className="export export-blob">
                  <img src={blobUrl!} alt="" />
                </div>

                <button
                  onClick={() => {
                    const canvas = excalidrawExportFns.exportToCanvas({
                      elements: excalidrawRef.current!.getSceneElements(),
                      appState: {
                        ...InitialData.appState,
                        exportWithDarkMode,
                        //@ts-ignore
                        shouldAddWatermark,
                      },
                    });
                    setCanvasUrl(canvas.toDataURL());
                  }}
                >
                  Export to Canvas
                </button>
                <div className="export export-canvas">
                  <img src={canvasUrl!} alt="" />
                </div>
              </Fragment>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default App;
