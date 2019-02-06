# WebStart
## Starter Web DSP Project

### Overview
A sample web application starter project consisting of main container page (BOOTMAIN) and components for login (BOOTLOGIN), alerts (BOOTALERT), simple navigation (BOOTNAV) and a sample page (BOOTPAGE). Subsequent additions include Bootstrap CSS based tabs (BOOTTABS) and modality support (BOOTMODAL loaded into container in BOOTMAIN, which provides methods to show other DSP's modally).

#### Background
It was built for the Uniface Lecture Webinar: Building Responsive Applications using Uniface 9.7, and aims to provide a starting point for application architecture. It provides a simpler implementation than the WebFramework project (which contains some features you may not require, e.g. routing tables & html 5 history with its associated security risks) but mostly retains compatibility. This project does add some additional features, however:
- login persistence via isolated storage or cookies
- separate alert component to allow more flexible positioning (e.g. after navigation). 

#### Dependencies
Various UI resources are used, and are loaded from an external Content Delivery Network (CDN) by default:
- bootstrap 3
- jquery
- font-awesome

### Installation and Configuration
To be tested and documented - use the DevelopmentTools installer.

### Related Resources
YouTube recording with presentation and walkthrough: https://www.youtube.com/playlist?list=PLec4UnOD-AIJ796owq-C_hJ8Y7-FMPrH2

Slides: https://www.slideshare.net/Uniface/uniface-lectures-webinar-building-responsive-applications-with-uniface-getting-started
