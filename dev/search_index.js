var documenterSearchIndex = {"docs":
[{"location":"#LiveServer.jl-Documentation-1","page":"Home","title":"LiveServer.jl - Documentation","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"LiveServer is a simple and lightweight development web-server written in Julia, based on HTTP.jl. It has live-reload capability, i.e. when changing files, every browser (tab) currently displaying a corresponding page is automatically refreshed.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"LiveServer is inspired from Python's http.server and Node's browsersync.","category":"page"},{"location":"#Installation-1","page":"Home","title":"Installation","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"In Julia ≥ 1.0, you can add it using the Package Manager writing","category":"page"},{"location":"#","page":"Home","title":"Home","text":"pkg> add LiveServer","category":"page"},{"location":"#Usage-1","page":"Home","title":"Usage","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"The main function LiveServer exports is serve which starts listening to the current folder and makes its content available to a browser. The following code creates an example directory and serves it:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"julia> using LiveServer\njulia> LiveServer.example() # creates an \"example/\" folder with some files\njulia> cd(\"example\")\njulia> serve() # starts the local server & the file watching\n✓ LiveServer listening on http://localhost:8000...\n  (use CTRL+C to shut down)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Open a Browser and go to http://localhost:8000/ to see the content being rendered; try modifying files (such as index.html) and watch the changes being rendered immediately in the browser.","category":"page"},{"location":"#Serve-docs-1","page":"Home","title":"Serve docs","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"A function derived from serve that will be convenient to Julia package developpers is servedocs. It runs Documenter.jl along with LiveServer to render your docs and will track and render any modifications to your docs. This instantaneous feedback makes writing docs significantly easier and faster.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Assuming you are in directory/to/YourPackage.jl and that you have a docs/ folder as prescribed by Documenter, just run:","category":"page"},{"location":"#","page":"Home","title":"Home","text":"julia> using LiveServer\njulia> servedocs()\n[ Info: SetupBuildDirectory: setting up build directory.\n[ Info: ExpandTemplates: expanding markdown templates.\n...\n└ Deploying: ✘\n✓ LiveServer listening on http://localhost:8000/ ...\n  (use CTRL+C to shut down)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Open a browser and go to http://localhost:8000/ to see your docs being rendered; try modifying files (e.g. docs/index.md) and watch the changes being rendered in the browser.","category":"page"},{"location":"#How-it-works-1","page":"Home","title":"How it works","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"Let's assume you have a directory similar to that generated by LiveServer.example():","category":"page"},{"location":"#","page":"Home","title":"Home","text":".\n├── css\n│   └── master.css\n├── files\n│   └── TestImage.png\n├── index.html\n└── pages\n    └── blah.html","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Calling serve() from within this directory starts a file server. It serves the contents of the directory as a static site, with the folder structure defining the paths of the URLs. That is, the file blah.html can be viewed at /pages/blah.html. When a directory is specified instead of a file, the server checks whether there is a file index.html in this directory and serves it if available.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"Visiting http://localhost:8000/ makes your browser send a standard HTTP GET request to the server. The server, running a listener loop, receives this request, looks for index.html in the root folder, and serves it. After serving it, LiveServer adds this file to the list of watched files. That is, whenever this file changes, a callback is fired (see below). The HTML page may also contain references to style sheets or pictures, which are then requested by your browser as well. The server sends them to the browser, and also adds them to the list of watched files.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"But what about the live reloading? Triggering a page refresh in the browser is achieved by a WebSocket connection. The WebSocket API, according to MDN, is","category":"page"},{"location":"#","page":"Home","title":"Home","text":"an advanced technology that makes it possible to open a two-way interactive communication session between the user's browser and a server.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"LiveServer injects a small piece of JavaScript code into every HTML file before serving it. This snippet is executed by the browser and opens a WebSocket connection to the server, which in turn adds it to a list of viewers of this page.","category":"page"},{"location":"#","page":"Home","title":"Home","text":"The server can now send the message \"update\" to all viewers of a page whenever the page is changed. The code snippet reacts to this message by triggering a page reload (same as hitting F5). The update is triggered by the callback mentioned above. When the file is not an HTML file, the viewers of any HTML file are updated, since LiveServer currently does not keep track of which HTML files reference what other files.","category":"page"},{"location":"man/functionalities/#Main-functions-1","page":"Functionalities","title":"Main functions","text":"","category":"section"},{"location":"man/functionalities/#","page":"Functionalities","title":"Functionalities","text":"The two main functions exported by the package are","category":"page"},{"location":"man/functionalities/#","page":"Functionalities","title":"Functionalities","text":"serve and\nservedocs,","category":"page"},{"location":"man/functionalities/#","page":"Functionalities","title":"Functionalities","text":"they are discussed in some details here.","category":"page"},{"location":"man/functionalities/#serve-1","page":"Functionalities","title":"serve","text":"","category":"section"},{"location":"man/functionalities/#","page":"Functionalities","title":"Functionalities","text":"The exported serve function is the main function of the package. The basic usage is","category":"page"},{"location":"man/functionalities/#","page":"Functionalities","title":"Functionalities","text":"julia> cd(\"directory/of/website\")\njulia> serve()\n✓ LiveServer listening on http://localhost:8000/ ...\n  (use CTRL+C to shut down)","category":"page"},{"location":"man/functionalities/#","page":"Functionalities","title":"Functionalities","text":"which will make the content of the folder available to be viewed in a browser.","category":"page"},{"location":"man/functionalities/#","page":"Functionalities","title":"Functionalities","text":"You can specify the port that the server should listen to (default is 8000) as well as the directory to serve (if not the current one) as keyword arguments. There is also a verbose keyword-argument if you want to see messages being displayed on file changes and connections.","category":"page"},{"location":"man/functionalities/#","page":"Functionalities","title":"Functionalities","text":"More interestingly, you can optionally specify the filewatcher (the only regular argument) which allows to define what will trigger the messages to the client and ultimately cause the active browser tabs to reload. By default, it is file modifications that will trigger page reloads but you may want to write your own file watcher to perform additional actions upon file changes or trigger browser reload differently.","category":"page"},{"location":"man/functionalities/#","page":"Functionalities","title":"Functionalities","text":"Finally, you can specify a function coreloopfun which is called continuously while the server is running. There may be circumstances where adjusting coreloopfun helps to complement the tuning of a FileWatcher.","category":"page"},{"location":"man/functionalities/#","page":"Functionalities","title":"Functionalities","text":"See the section on Extending LiveServer for more informations.","category":"page"},{"location":"man/functionalities/#servedocs-1","page":"Functionalities","title":"servedocs","text":"","category":"section"},{"location":"man/functionalities/#","page":"Functionalities","title":"Functionalities","text":"The exported servedocs function is a convenient function derived from serve. The main purpose is to allow Julia package developpers to live-preview their documentation while working on it by coupling Documenter.jl and LiveServer.jl.","category":"page"},{"location":"man/functionalities/#","page":"Functionalities","title":"Functionalities","text":"Let's assume the structure of your package looks like","category":"page"},{"location":"man/functionalities/#","page":"Functionalities","title":"Functionalities","text":".\n├── LICENSE.md\n├── Manifest.toml\n├── Project.toml\n├── README.md\n├── docs\n│   ├── Project.toml\n│   ├── build\n│   ├── make.jl\n│   └── src\n│       └── index.md\n├── src\n│   └── MyPackage.jl\n└── test\n    └── runtests.jl\n","category":"page"},{"location":"man/functionalities/#","page":"Functionalities","title":"Functionalities","text":"The standard way of running Documenter.jl is to run make.jl, wait for completion and then use a standard browser or maybe some third party tool to see the output.","category":"page"},{"location":"man/functionalities/#","page":"Functionalities","title":"Functionalities","text":"With servedocs however, you can edit the .md files in your docs/src and see the changes being applied directly in your browser which makes writing documentation faster and easier. To launch it, navigate to YourPackage.jl/ and simply","category":"page"},{"location":"man/functionalities/#","page":"Functionalities","title":"Functionalities","text":"julia> using LiveServer\njulia> servedocs()","category":"page"},{"location":"man/functionalities/#","page":"Functionalities","title":"Functionalities","text":"This will execute make.jl (a pass of Documenter.jl) before live serving the resulting docs/build folder with LiveServer.jl. Upon modifying a .md file (e.g. updating docs/src/index.md), the make.jl will be applied and the corresponding changes propagated to active tabs (e.g. a tab watching http://localhost:8000/index.html)","category":"page"},{"location":"man/functionalities/#","page":"Functionalities","title":"Functionalities","text":"note: Note\nThe first pass of Documenter.jl takes a few seconds to complete, but subsequent passes are quite fast so that the workflow with Documenter.jl+LiveServer.jl is pretty quick.The first pass collects all information in the code (i.e. docstrings), while subsequent passes only consider changes in the markdown (.md) files. This restriction is necessary to achieve a fast update behavior.","category":"page"},{"location":"man/extending_ls/#Extending-LiveServer-1","page":"Extending LiveServer","title":"Extending LiveServer","text":"","category":"section"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"There may be circumstances where you will want the page-reloading to be triggered by your own mechanism. As a very simple example, you may want to display your own custom messages every time a file is updated. This page explains how to extend SimpleWatcher <: FileWatcher and, more generally, how to write your own FileWatcher. We also explain how in some circumstances it may be easier to feed a custom coreloopfun to serve rather than writing a custom callback.","category":"page"},{"location":"man/extending_ls/#Using-SimpleWatcher-with-a-custom-callback-1","page":"Extending LiveServer","title":"Using SimpleWatcher with a custom callback","text":"","category":"section"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"In most circumstances, using an instance of the SimpleWatcher type with your own custom callback function is what you will want to do.","category":"page"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"The SimpleWatcher does what you expect: it watches files for changes and triggers a function (the callback) when a change is detected. The callback function takes as argument the path of the file that was modified and returns nothing.","category":"page"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"The base callback function (LiveServer.file_changed_callback) does only one thing: it sends a signal to the relevant viewers to trigger page reloads. You will typically want to re-use file_changed_callback or copy its code.","category":"page"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"As an example of a custom callback, here is a simple modified callback mechanism which prints Hello! before using the base callback function:","category":"page"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"custom_callback(fp::AbstractString) = (println(\"Hello!\"); file_changed_callback(fp))","category":"page"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"A more sophisticated customised callback is the one that is used in servedocs (see LiveServer.servedocs_callback). The callback has a different behaviour depending on which file is modified and does a few extra steps before signalling the viewers to reload appropriate pages.","category":"page"},{"location":"man/extending_ls/#Writing-your-own-FileWatcher-1","page":"Extending LiveServer","title":"Writing your own FileWatcher","text":"","category":"section"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"If you decide to write your own FileWatcher type, you will need to meet the API. The easier is probably that you look at the code for LiveServer.SimpleWatcher and adapt it to your need. Let's assume for now that you want to define a CustomWatcher <: FileWatcher.","category":"page"},{"location":"man/extending_ls/#Fields-1","page":"Extending LiveServer","title":"Fields","text":"","category":"section"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"The only field that is required by the rest of the code is","category":"page"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"status: a symbol that must be set to :interrupted upon errors in the file watching task","category":"page"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"Likely you will want to have some (probably most) of the fields of a SimpleWatcher i.e.:","category":"page"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"callback: the callback function to be triggered upon an event,\ntask: the asynchronous file watching task,\nwatchedfiles: the vector of LiveServer.WatchedFile i.e. the paths to the file being watched as well as their time of last modification,\nsleeptime: the time to wait before going over the list of watchedfiles to check for changes, you won't want this to be too small and it's lower bounded to 0.05 in SimpleWatcher.","category":"page"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"Of course you can add any extra field you may want.","category":"page"},{"location":"man/extending_ls/#Methods-1","page":"Extending LiveServer","title":"Methods","text":"","category":"section"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"Subsequently, your CustomWatcher may redefine some or all of the following methods (those that aren't will use the default method defined for FileWatcher and thus all of its sub-types).","category":"page"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"The methods that are required by the rest of the code are","category":"page"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"start(::FileWatcher) and stop(::FileWatcher) to start and stop the watcher,\nwatch_file!(::FileWatcher, ::AbstractString) to consider an additional file.","category":"page"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"You may also want to re-define existing methods such as","category":"page"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"file_watcher_task!(::FileWatcher): the loop that goes over the watched files, checking for modifications and triggering the callback function. This task will be referenced by the field CustomWatcher.task. If errors happen in this asynchronous task, the CustomWatcher.status should be set to :interrupted so that all running tasks can be stopped properly.\nset_callback!(::FileWatcher, ::Function): a helper function to bind a watcher with a callback function.\nis_running(::FileWatcher): a helper function to check whether CustomWatcher.task is done.\nis_watched(::FileWatcher, ::AbstractString): check if a file is watched by the watcher.","category":"page"},{"location":"man/extending_ls/#Using-a-custom-coreloopfun-1","page":"Extending LiveServer","title":"Using a custom coreloopfun","text":"","category":"section"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"In some circumstances, your code may be using specific data structures or be such that it would not easily play well with a FileWatcher mechanism. In that case, you may want to also specify a coreloopfun which is called continuously from within the serve main loop.","category":"page"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"The code of serve is essentially structured as follows:","category":"page"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"function serve(...)\n    # ...\n    @async HTTP.listen(...) # handles messages with the client (browser)\n    # ...\n    try\n        counter = 1\n        while true # the main loop\n            # ...\n            coreloopfun(counter, filewatcher)\n            counter += 1\n            sleep(0.1)\n        end\n    catch err\n        # ...\n    finally\n        # cleanup ...\n    end\n    return nothing\nend","category":"page"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"That is, the coreloopfun is called roughly every 100 ms while the server is running. By default the coreloopfun does nothing.","category":"page"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"An example where this mechanism could be used is when your code handles the processing of files from one format (say markdown) to HTML. You want the FileWatcher to trigger browser reloads whenever new versions of these HTML files are produced. However, at the same time, you want another process to keep track of the markdown files and re-process them as they change. You can hook this second watcher into the core loop of LiveServer using the coreloopfun. An example for this use case is JuDoc.jl.","category":"page"},{"location":"man/extending_ls/#Why-not-use-FileWatching?-1","page":"Extending LiveServer","title":"Why not use FileWatching?","text":"","category":"section"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"You may be aware of the FileWatching module in Base and may wonder why we did not just use that one. The main reasons we decided not to use it are:","category":"page"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"it triggers a lot: where our system only triggers the callback function upon saving a file (e.g. you modified the file and saved the modification), FileWatching is more sensitive (for instance it will trigger when you open the file),\nit is somewhat harder to make your own custom mechanisms to fire page reloads.","category":"page"},{"location":"man/extending_ls/#","page":"Extending LiveServer","title":"Extending LiveServer","text":"So ultimately, our system can be seen as a poor man's implementation of FileWatching that is robust, simple and easy to customise.","category":"page"},{"location":"lib/public/#Public-Interface-1","page":"Public","title":"Public Interface","text":"","category":"section"},{"location":"lib/public/#","page":"Public","title":"Public","text":"Documentation for LiveServer.jl's exported functions","category":"page"},{"location":"lib/public/#","page":"Public","title":"Public","text":"LiveServer.serve\nLiveServer.servedocs","category":"page"},{"location":"lib/public/#LiveServer.serve","page":"Public","title":"LiveServer.serve","text":"serve(filewatcher; port=8000, dir=\"\", verbose=false, coreloopfun=(c,fw)->nothing)\n\nMain function to start a server at http://localhost:port and render what is in the current directory. (See also example for an example folder).\n\nfilewatcher is a file watcher implementing the API described for SimpleWatcher (which also is the default) and messaging the viewers (via WebSockets) upon detecting file changes.\nport is an integer between 8000 (default) and 9000.\ndir specifies where to launch the server if not the current working directory.\nverbose is a boolean switch to make the server print information about file changes and connections.\ncoreloopfun specifies a function which can be run every 0.1 second while the liveserver is going; it takes two arguments: the cycle counter and the filewatcher. By default the coreloop does nothing.\n\nExample\n\nLiveServer.example()\nserve(port=8080, dir=\"example\", verbose=true)\n\nIf you open a browser to http://localhost:8080/, you should see the index.html page from the example folder being rendered. If you change the file, the browser will automatically reload the page and show the changes.\n\n\n\n\n\n","category":"function"},{"location":"lib/public/#LiveServer.servedocs","page":"Public","title":"LiveServer.servedocs","text":"servedocs()\n\nCan be used when developping a package to run the docs/make.jl file from Documenter.jl and then serve the docs/build folder with LiveServer.jl. This function assumes you are in the directory [MyPackage].jl with a subfolder docs.\n\n\n\n\n\n","category":"function"},{"location":"lib/internals/#Internal-Interface-1","page":"Internals","title":"Internal Interface","text":"","category":"section"},{"location":"lib/internals/#","page":"Internals","title":"Internals","text":"Documentation for LiveServer.jl's internal interface","category":"page"},{"location":"lib/internals/#File-watching-1","page":"Internals","title":"File watching","text":"","category":"section"},{"location":"lib/internals/#","page":"Internals","title":"Internals","text":"There are two key types related to file watching:","category":"page"},{"location":"lib/internals/#","page":"Internals","title":"Internals","text":"one to wrap a file being watched (LiveServer.WatchedFile),\none for the file watcher itself wrapping the list of watched files and what to do upon file changes (\"callback\" function)","category":"page"},{"location":"lib/internals/#","page":"Internals","title":"Internals","text":"Any file watcher will be a subtype of the abstract type LiveServer.FileWatcher with, for instance, the default watcher being LiveServer.SimpleWatcher.","category":"page"},{"location":"lib/internals/#WatchedFile-1","page":"Internals","title":"WatchedFile","text":"","category":"section"},{"location":"lib/internals/#","page":"Internals","title":"Internals","text":"LiveServer.WatchedFile\nLiveServer.has_changed\nLiveServer.set_unchanged!","category":"page"},{"location":"lib/internals/#LiveServer.WatchedFile","page":"Internals","title":"LiveServer.WatchedFile","text":"WatchedFile\n\nStruct for a file being watched containing the path to the file as well as the time of last modification.\n\n\n\n\n\n","category":"type"},{"location":"lib/internals/#LiveServer.has_changed","page":"Internals","title":"LiveServer.has_changed","text":"has_changed(wf::WatchedFile)\n\nCheck if a WatchedFile has changed. Returns -1 if the file does not exist, 0 if it does exist but has not changed, and 1 if it has changed.\n\n\n\n\n\n","category":"function"},{"location":"lib/internals/#LiveServer.set_unchanged!","page":"Internals","title":"LiveServer.set_unchanged!","text":"set_unchanged!(wf::WatchedFile)\n\nSet the current state of a WatchedFile as unchanged\"\n\n\n\n\n\n","category":"function"},{"location":"lib/internals/#FileWatcher-1","page":"Internals","title":"FileWatcher","text":"","category":"section"},{"location":"lib/internals/#Key-types-1","page":"Internals","title":"Key types","text":"","category":"section"},{"location":"lib/internals/#","page":"Internals","title":"Internals","text":"LiveServer.FileWatcher\nLiveServer.SimpleWatcher","category":"page"},{"location":"lib/internals/#LiveServer.FileWatcher","page":"Internals","title":"LiveServer.FileWatcher","text":"FileWatcher\n\nAbstract Type for file watching objects such as SimpleWatcher.\n\n\n\n\n\n","category":"type"},{"location":"lib/internals/#LiveServer.SimpleWatcher","page":"Internals","title":"LiveServer.SimpleWatcher","text":"SimpleWatcher([callback]; sleeptime::Float64=0.1) <: FileWatcher\n\nA simple file watcher. You can specify a callback function, receiving the path of each file that has changed as an AbstractString, at construction or later by the API function set_callback!. The sleeptime is the time waited between two runs of the loop looking for changed files, it is constrained to be at least 0.05s.\n\n\n\n\n\n","category":"type"},{"location":"lib/internals/#Functions-related-to-a-FileWatcher-1","page":"Internals","title":"Functions related to a FileWatcher","text":"","category":"section"},{"location":"lib/internals/#","page":"Internals","title":"Internals","text":"LiveServer.start\nLiveServer.stop\nLiveServer.set_callback!\nLiveServer.watch_file!\nLiveServer.file_watcher_task!","category":"page"},{"location":"lib/internals/#LiveServer.start","page":"Internals","title":"LiveServer.start","text":"start(fw::FileWatcher)\n\nStart the file watcher and wait to make sure the task has started.\n\n\n\n\n\n","category":"function"},{"location":"lib/internals/#LiveServer.stop","page":"Internals","title":"LiveServer.stop","text":"stop(fw::FileWatcher)\n\nStop the file watcher. The list of files being watched is preserved and new files can still be added to the file watcher using watch_file!. It can be restarted with start. Returns a Bool indicating whether the watcher was running before stop was called.\n\n\n\n\n\n","category":"function"},{"location":"lib/internals/#LiveServer.set_callback!","page":"Internals","title":"LiveServer.set_callback!","text":"set_callback!(fw::FileWatcher, callback::Function)\n\nSet or change the callback function being executed upon a file change. Can be \"hot-swapped\", i.e. while the file watcher is running.\n\n\n\n\n\n","category":"function"},{"location":"lib/internals/#LiveServer.watch_file!","page":"Internals","title":"LiveServer.watch_file!","text":"watch_file!(fw::FileWatcher, f_path::AbstractString)\n\nAdd a file to be watched for changes.\n\n\n\n\n\n","category":"function"},{"location":"lib/internals/#LiveServer.file_watcher_task!","page":"Internals","title":"LiveServer.file_watcher_task!","text":"file_watcher_task!(w::FileWatcher)\n\nHelper function that's spawned as an asynchronous task and checks for file changes. This task is normally terminated upon an InterruptException and shows a warning in the presence of any other exception.\n\n\n\n\n\n","category":"function"},{"location":"lib/internals/#Additional-helper-functions:-1","page":"Internals","title":"Additional helper functions:","text":"","category":"section"},{"location":"lib/internals/#","page":"Internals","title":"Internals","text":"LiveServer.is_running\nLiveServer.is_watched","category":"page"},{"location":"lib/internals/#LiveServer.is_running","page":"Internals","title":"LiveServer.is_running","text":"is_running(fw::FileWatcher)\n\nChecks whether the file watcher is running.\n\n\n\n\n\n","category":"function"},{"location":"lib/internals/#LiveServer.is_watched","page":"Internals","title":"LiveServer.is_watched","text":"is_watched(fw::FileWatcher, f_path::AbstractString)\n\nChecks whether the file specified by f_path is being watched.\n\n\n\n\n\n","category":"function"},{"location":"lib/internals/#Live-serving-1","page":"Internals","title":"Live serving","text":"","category":"section"},{"location":"lib/internals/#","page":"Internals","title":"Internals","text":"The exported serve and servedocs functions are not stated again. The serve method instantiates a listener (HTTP.listen) in an asynchronous task. The callback upon an incoming HTTP stream decides whether it is a standard HTTP request or a request for an upgrade to a websocket connection. The former case is handled by LiveServer.serve_file, the latter by LiveServer.ws_tracker. Finally, LiveServer.file_changed_callback is the function passed to the file watcher to be executed upon file changes.","category":"page"},{"location":"lib/internals/#","page":"Internals","title":"Internals","text":"LiveServer.serve_file\nLiveServer.ws_upgrade\nLiveServer.ws_tracker\nLiveServer.file_changed_callback","category":"page"},{"location":"lib/internals/#LiveServer.serve_file","page":"Internals","title":"LiveServer.serve_file","text":"serve_file(fw, req::HTTP.Request)\n\nHandler function for serving files. This takes a file watcher, to which files to be watched can be added, and a request (e.g. a path entered in a tab of the browser), and converts it to the appropriate file system path. If the path corresponds to a HTML file, it will inject the reloading <script> (see file client.html) at the end of its body, i.e. directly before the </body> tag. All files served are added to the file watcher, which is responsible to check whether they're already watched or not. Finally the file is served via a 200 (successful) response. If the file does not exist, a response with status 404 and an according message is sent.\n\n\n\n\n\n","category":"function"},{"location":"lib/internals/#LiveServer.ws_upgrade","page":"Internals","title":"LiveServer.ws_upgrade","text":"ws_upgrade(http::HTTP.Stream)\n\nUpgrade the HTTP request in the stream to a websocket.\n\n\n\n\n\n","category":"function"},{"location":"lib/internals/#LiveServer.ws_tracker","page":"Internals","title":"LiveServer.ws_tracker","text":"ws_tracker(ws::HTTP.WebSockets.WebSocket, target::AbstractString)\n\nAdds the websocket connection to the viewers in the global dictionary WS_VIEWERS to the entry corresponding to the targeted file.\n\n\n\n\n\n","category":"function"},{"location":"lib/internals/#LiveServer.file_changed_callback","page":"Internals","title":"LiveServer.file_changed_callback","text":"file_changed_callback(f_path::AbstractString)\n\nFunction reacting to the change of the file at f_path. Is set as callback for the file watcher.\n\n\n\n\n\n","category":"function"},{"location":"lib/internals/#Additional-helper-functions:-2","page":"Internals","title":"Additional helper functions:","text":"","category":"section"},{"location":"lib/internals/#","page":"Internals","title":"Internals","text":"LiveServer.get_fs_path\nLiveServer.update_and_close_viewers!","category":"page"},{"location":"lib/internals/#LiveServer.get_fs_path","page":"Internals","title":"LiveServer.get_fs_path","text":"get_fs_path(req_path::AbstractString)\n\nReturn the filesystem path corresponding to a requested path, or an empty String if the file was not found.\n\n\n\n\n\n","category":"function"},{"location":"lib/internals/#LiveServer.update_and_close_viewers!","page":"Internals","title":"LiveServer.update_and_close_viewers!","text":"update_and_close_viewers!(wss::Vector{HTTP.WebSockets.WebSocket})\n\nTake a list of viewers, i.e. WebSocket connections from a client, send a message with data \"update\" to each of them (to trigger a page reload), then close the connection. Finally, empty the list since all connections are closing anyway and clients will re-connect from the re-loaded page.\n\n\n\n\n\n","category":"function"},{"location":"lib/internals/#Helper-functions-associated-with-servedocs-1","page":"Internals","title":"Helper functions associated with servedocs","text":"","category":"section"},{"location":"lib/internals/#","page":"Internals","title":"Internals","text":"LiveServer.servedocs_callback\nLiveServer.scan_docs!","category":"page"},{"location":"lib/internals/#LiveServer.servedocs_callback","page":"Internals","title":"LiveServer.servedocs_callback","text":"servedocs_callback(filepath, watchedfiles, path2makejl)\n\nCustom callback used in servedocs triggered when the file corresponding to filepath is changed. If that file is docs/make.jl, the callback will check whether any new files have been added in the docs/src folder and add them to the watched files, it will also remove any file that may have been deleted or renamed. Otherwise, if the modified file is in docs/src or is docs/make.jl, a pass of Documenter is triggered to regenerate the documents, subsequently the LiveServer will render the produced pages in docs/build.\n\n\n\n\n\n","category":"function"},{"location":"lib/internals/#LiveServer.scan_docs!","page":"Internals","title":"LiveServer.scan_docs!","text":"scan_docs!(dw::SimpleWatcher)\n\nScans the docs/ folder in order to recover the path to all files that have to be watched and add those files to dw.watchedfiles. The function returns the path to docs/make.jl.\n\n\n\n\n\n","category":"function"},{"location":"lib/internals/#Miscellaneous-1","page":"Internals","title":"Miscellaneous","text":"","category":"section"},{"location":"lib/internals/#","page":"Internals","title":"Internals","text":"LiveServer.example\nLiveServer.setverbose","category":"page"},{"location":"lib/internals/#LiveServer.example","page":"Internals","title":"LiveServer.example","text":"example()\n\nSimple function to copy an example website folder to the current working directory that can be watched by the LiveServer to get an idea of how things work.\n\nExample\n\nLiveServer.example()\ncd(\"example\")\nserve()\n\n\n\n\n\n","category":"function"},{"location":"lib/internals/#LiveServer.setverbose","page":"Internals","title":"LiveServer.setverbose","text":"setverbose(b)\n\nSet the verbosity of LiveServer to either true (showing messages upon events) or false (default).\n\n\n\n\n\n","category":"function"}]
}
