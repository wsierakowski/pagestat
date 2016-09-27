# WebSpider

## Use

```js
$ node webspider url nesting
```
Where:
- url is a website URL
- nesting is depth for downloading linked pages (only from the same domain)


Example:
```js
$ node webspider http://google.com 4
```


## How it works

1. Get a file path by converting the provided URL into path by removing the protocol, every component between slash becomes a folder. The last component becomes a filename.
2. Check if the file exists - if so the page has been downloaded - exit or go to the spider links component
3. If the file doesn't exist, download the content of the page and then save it to the file
4. Once a page has been downloaded, traverse it to get the links in the same domain and launch the spider module again. Decrease the nesting value.

## Dependencies

- request (getting the page)
- mkdrip (creating structure of folders)
- path (getting the directory path - excluding the file)
- utilities.urlToFilename (getting filepaths from URL)
- utilities.getPageLinks (go through the page, get the links and return only those for the same domain)

## Sub-modules

### WebSpider (entry point)
Takes url and nesting parameter from the command line. Initiates the program.

### Download
Checks if there is a file for that page, if no - takes URL and downloads the page, returns a page body.

### ReadFile
Takes file path and reads a file. If there is no file, indicate that.

### SaveToFile
Takes body and file path, checks if a folder is already there and if note creates it and the file.

### GetLinks
Takes page URL, HTML and nesting param and then gets links in the same domain and then adds download tasks to the task queue (decreasing the nesting value).
Returns immediately: If nesting is zero or if there are no more links

### TaskQueue
Download queue (singleton)

## Flow
1. WebSpider reads url and nesting params from the args and adds a download task to the queue.
2. The while queue checks how many tasks are running currently. If there is an empty space, then call Download.
3. Download checks if the page for this URL has been downloaded, if not, download it and save to the file. Call GetLInks for the body.
4. Get links finds links and adds tasks to the TaskQueue.