# ✍ Node.js-JSON-Parser ✍
<div>
  <p>A custom Json file Parser that can be used in Node.js projects, utilsing a three step lexing, tokenisation and parsing system to parse all relevant JSON files. Includes error checking. Installation instrutions and features below </p>
</div>
<div>
   <h2>Table of Contents</h2>
  <ul>
    <li><a href="#Setup">How to Setup</a></li>
    <li><a href="#Features">Features</a></li>
    <li><a href="Limitations">Limitations</a></li>
  </ul>
</div>

<div>
  <h2 id="section1">Breakdown</h2>
</div>

<div>
  <h2 id="Setup">How to Setup</h2>

  <ol>
    <div>
    <hr>
    <img src="Readme_Image's/Instruct_One.jpg" alt="Folder 3" style="max-width:100%;">
    <hr>
    <li><b>To download the JSON parser files, click the <>code button on the right-hand side of the repository</b></li>
    </div>
    <div>
    <hr>
    <img src="Readme_Image's/Instruct_Two.jpg" alt="Folder 3" style="max-width:100%;">
    <hr>
    <li><b>On the drop-down menu, select the bottom option to download the repository as a Zip</b></li>
    </div>
    <div>
    <hr>
    <img src="Readme_Image's/Instruct_Four.jpg" alt="Folder 3" style="max-width:100%;">
    <hr>
    <li><b>Extract the JSON_Parser folder to a valid location on your pc (Documents or Desktop)</b></li>
    </div>
    <div>
    <hr>
    <img src="Readme_Image's/Instruct_Five.jpg" alt="Folder 3" style="max-width:100%;">
    <hr>
    <li><b>Open cmd, and cd to your project folder that you want to add the downloaded parsing module</b></li>
    </div>
    <div>
    <hr>
    <img src="Readme_Image's/Instruct_Five.jpg" alt="Folder 3" style="max-width:100%;">
    <hr>
    <li><b>Once your in the correct repository, install the JSON parser as above, specifying the directory folder of the JSON files (specifically the Node.js-JSON-Parser
/JSONParser folder which holds the Index.js, Parser.js, and package.json)</b></li>
    </div>
    <div>
    <hr>
    <img src="Readme_Image's/Instruct_Five.jpg" alt="Folder 3" style="max-width:100%;">
    <hr>
    <li><b>Inside of the javascript file you wish parse data, import the parser with <code>const { Parse } = require('jsonparser');</code> </b></li>
    </div>
    </div>
    <div>
    <hr>
    <img src="Readme_Image's/Instruct_Five.jpg" alt="Folder 3" style="max-width:100%;">
    <hr>
    <li><b>If you want to quickly test if it works. Grab the Test folder inside of the JSON Github repository, and drag it into the same folder as your working file. Then run this code <code>var path = "./data/step4/valid.json";

const {Parse} = require('jsonparser');
const fs = require('fs');

fs.readFile(path, 'utf8', (err, data) => {
    if(err) {
        console.error(err);
        return;
    }
    var parsed = Parse(data);
    console.log(parsed);
});

</code></b></li>
    </div>
  </ol>
</div>
<hr>

<div>
  <h3 id="capabilities">Capabilities</h3>
  <p>This <b>ASCII converter</b> manipulates image bit domain headers and data to provide versatile conversion functions:</p>
  <ol>
    <li>Supports various image types, e.g., <b>PNG, BMP, JPG, JPEG, TIFF, WEBM</b></li>
    <li>Functions for reading: <b>8-bit color, greyscale, 12-bit, 16-bit, 24-bit color</b></li>
    <li>Downsampling algorithm with intensity ranging from <b>1 to 20 scales</b></li>
    <li>Aspect ratio setting for wider images, ranging from <b>1:1 to 4:1</b></li>
    <li>Negative or positive ASCII mode options ("light" or "dark")</li>
  </ol>
</div>

<div>
  <h3 id="limitations">Limitations</h3>
  <p><b>WARNING:</b> The ASCII converter currently does not support alpha conversion with 32-bit PNG images or esoteric bit types like 4-bit, 1-bit, 2-bit. GIF support is pending.</p>
</div>

<h1 id="section2">How to Setup</h1>

<div>
  <h3 id="downloads">Download -> Source Code || .exe</h3>
  <p>Below are the contents of the <code>ASCII_Converter</code>:</p>
  
  <img src="README_IMG'S/Folder_1.jpg" alt="Folder 1" style="max-width:100%;">
  <p><b>The first two folders contain build data for the PyInstaller executable and the folder with the executable program. Place your images in this folder.</b></p>
  
  <img src="README_IMG'S/Folder_2.jpg" alt="Folder 2" style="max-width:100%;">
  <p><b>There are two ASCII_Converter source files in Jupyter notebook and Python formats, allowing modification of functionalities.</b></p>
  
  <img src="README_IMG'S/Folder_3.jpg" alt="Folder 3" style="max-width:100%;">
  <p><b>A README file containing a copy of the GitHub repository README.</b></p>
  
  <img src="README_IMG'S/Folder_4.jpg" alt="Folder 4" style="max-width:100%;">
  <p><b>Use this structure for organizing your files and conversions.</b></p>
</div>

<div>
  <p><b>To run the application, place a folder inside <code>IMG'S_HERE</code>, open <code>ASCII_Converter</code>, and after conversion, an output file will be specified. For command-line instructions for the .exe converter, see below.</b></p>
</div>

<div>
  <h3 id="parameters">Parameters & Examples</h3>
  <p>Below are the contents of <code>ASCII_Converter.exe</code>:</p>
  
  <img src="README_IMG'S/c1.jpg" alt="Parameters 1" style="max-width:100%;">
  <p>The .exe will prompt the user for input in each step (required or optional) for the ASCII conversion process.</p>
  
  <img src="README_IMG'S/c2.jpg" alt="Parameters 2" style="max-width:100%;">
  <p>You will be asked to provide a downsampling factor. Larger images benefit from higher downsampling, with typical values between 5-20.</p>
  
  <img src="README_IMG'S/c3.jpg" alt="Parameters 3" style="max-width:100%;">
  <p>You will be asked to specify an aspect ratio for the image. This helps in maintaining the visual proportions of the ASCII output.</p>
  
  <img src="README_IMG'S/c4.jpg" alt="Parameters 4" style="max-width:100%;">
  <p>Choose whether to use negative or positive shadow modes. The default is light shadow mode, but it can be switched to dark.</p>
</div>

<div>
  <p><b>CONGRATULATIONS! You have created a <code>notepad.txt</code> file called <code>output</code> containing your specified ASCII text based on the input image. <b>WARNING:</b> Additional conversions will overwrite this file, so back up each ASCII you create.</b></p>
</div>

<div>
  <h3 id="creating">Creating Your Own Executable!</h3>
  <ol>
    <li><b>Download the notebook version of <code>ASCII_Converter</code> (.ipynb).</b></li>
    <li>Open Command Prompt (cmd).</li>
    <li>Right-click the file explorer top bar to copy the location path where your file resides.</li>
    <li>Use `cd` in cmd to navigate to the repository path:</li>
    <pre><code>cd path\to\your\repository</code></pre>
    <li>Convert the notebook to a Python script using:</li>
    <pre><code>jupyter nbconvert --to script ASCII_Converter.ipynb</code></pre>
    <li>Create an executable with PyInstaller using:</li>
    <pre><code>pyinstaller --onefile ascii_converter.py</code></pre>
    <li>Your executable will be available in the `dist` folder!</li>
  </ol>
</div>
