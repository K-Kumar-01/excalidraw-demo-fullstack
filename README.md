## About
This repo contains the complete code of the excalidraw-demo.
When the server is running, visiting the home page will trigger a function that will save the
details of the current drawing structure in a backend database. 
These details are visible at `/image` page. One can also click links for specific images.

## How to use
1. Clone the repo.
2. Run `yarn setup` to setup the development server.
3. Create `next.conifg.js` if not already create and export `MONGO_URI` env variable. Example:

    ```js
      module.exports={
        env: {
          MONGO_URI:<MongoAtlasServerConnectionURL>
        },
      }
    ```
4. Visit `localhost:3000` and see the server running.

Your database will be populated with the different images. Each image will have this basic structure.
```js
  name: new Date().getTime().toString(),
  svgString: JSON.stringify(result.outerHTML),
  link: router.pathname,
```
