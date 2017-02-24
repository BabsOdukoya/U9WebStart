<a name="Installation"></a>Installation
-----------------------------------
1. Create a new folder and checkout https://github.com/uniface/WebStart using your preferred Git client, e.g. Altassian SourceTree.
2. Create a USYS97 system variable pointing to the Uniface installation you want to use (e.g. latest Uniface 9.7). In my case that would be C:\Program Files (x86)\Uniface\9.7. Note the lack of quotes and the lack of a trailing slash. Alternatively just replace the %USYS97% string in all the shortcuts with the path to your Uniface installation.
3. Run the shortcut "WebStart - Setup" as administrator in your newly checked out project. This needs to run as administrator because it will be updating files like urouter.asn under your program files directory. The main thing to note is whatever you use for "project name" will be used in the URL for your project, so pick something that makes sense. It will default to the name of your project folder. Everything else should be picked up automatically from your usys.ini file, the only thing you might want to check is the userver user name and password.
4. Once the setup wizard has completed, restart your urouter.
5. Open a browser and point it at http://localhost:&lt;tomcat_port&gt;/&lt;project_name&gt;/. The values in angle brackets will be whatever you specified in the setup wizard, bearing in mind that &lt;project_name&gt; is case sensitive.
6. Login with any e-mail address and the password "password" (without the quotes).


<a name="Project_Structure"></a>Project Structure
---------------------------------------------

* adm       - All ini files for the project including usys.ini and uweb.ini
* asn       - Assignment files
* resources - Compiled Uniface objects
* dbms      - Application and source code SQLite databases
* docs      - Documentation folder
* dtd       - DTDs used by the framework
* ext       - External libraries like UnifaceVC and the project setup wizard
* hts       - External html DSP layouts
* log       - All logs
* lst       - Source code listings
* setup     - Files used by the setup wizard to configure the project
* src       - Source code exports
* web       - Web resources for the project including the generated dspjs files
