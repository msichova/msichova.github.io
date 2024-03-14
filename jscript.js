/* 
 * Adds html files, that includes in every web-site page, as innerHTML into page elements:
 * navBar.html page into div with id="navigation"
 * allSkillsIcons.html that contains acardion with skills into div with id="skills"
 * footer into div with id="footer"
*/ 
function includeHtmlDocs()
{ 
    //navigation bar
    fetch("./navBar.html").then((res) => res.text()).then((text) => {
        document.getElementById("navigation").innerHTML = text;
    });
    //skills acardion 
    fetch('./allSkillsIcons.html').then((res) => res.text()).then((text) => {
        document.getElementById("skills").innerHTML = text;
    });
    //footer
    fetch('./footer.html').then((res) => res.text()).then((html) => {
       document.getElementById("footer").innerHTML = html;
    }).then(() => {
        //adding my styles to the navigation bar
        addNavBarMyStyles();
        //adding styles, to some elements of current html page, depending on user choise of color theme
        setColorMode(); 
    });
}

/*
 * Accordion that is collapsed on load of page and on first mouse click expand
 * inserting symbole ︽ or ︾, at the end of innerHTML
*/
function accordion()
{
    let accardion = document.getElementsByClassName("accordion");
    let index;
    for (index = 0; index < accardion.length; index++) 
    {
        accardion[index].addEventListener("click", 
        function() 
        {
            this.classList.toggle('active');
            
            let panel = this.nextElementSibling;
            if (panel.style.display === 'block') 
            {
                //to hold symbole ︽ or ︾, to insert it into innerHTML at the end
                const char = '<b>︾</b>';
                panel.style.display = 'none';
                //inserting symbole ︽ or ︾, at the end of innerHTML
                this.innerHTML = (this.innerHTML.substring(0, this.innerHTML.length - char.length)) +  char;
            } 
            else 
            {
                //to hold symbole ︽ or ︾, to insert it into innerHTML at the end
                const char = '<b>︽</b>';
                panel.style.display = 'block';
                //inserting symbole ︽ or ︾, at the end of innerHTML
                this.innerHTML = (this.innerHTML.substring(0, this.innerHTML.length - char.length)) +  char;
            }
        });
    }
}

/*
 * Accordion that is expand on load of page and on first mouse click collapsed
 * inserting symbole ︽ or ︾, at the end of innerHTML
*/
function accordionForSkills()
{
    const accardion = document.getElementsByClassName("accordion-skills");

    accardion[0].classList.toggle('active-skills');

    const color = getUserPreferedColorScheme();

    //setting to the correct color-mode
    addRemoveClasses(accardion[0], color + "-text-mode", color === "dark" ? 
    "light-text-mode-not-important" : "dark-text-mode-not-important");

    //to hold symbole ︽ or ︾, to insert it into innerHTML at the end
    let char = '';

    //element that is expand and collapsed on mouse clicks
    let panel = document.getElementById("panel");

    if(panel.style.display === 'block')
    {
        char = '<b>︾</b>';
        panel.style.display = 'none';
    }
    else 
    {
        char = '<b>︽</b>';
        panel.style.display = 'block';
    }

    const length = accardion[0].innerHTML.length - char.length;

    //inserting symbole ︽ or ︾, at the end of innerHTML
    accardion[0].innerHTML = accardion[0].innerHTML.substring(0, length) + char;
}

function selfPrintitngText(elementId, delay, text)
{
    const element = document.getElementById(elementId);
    const carret = '_';
    let print_text = function(textToTrim, element, delay)
    {
        if(textToTrim.length > 0)
        {
            if(textToTrim.length != 0)
            {
                element.innerHTML = element.innerHTML.substring(0, element.innerHTML.length-1); 
            }

            if(textToTrim[0] != '<')
            {
                element.innerHTML += textToTrim[0] + carret;
            }
            
            if(textToTrim[0] === '<')
            {
                textToTrim = textToTrim.substring(4, textToTrim.length + 1);
                element.innerHTML += '<br>' + textToTrim[0] + carret;
            }
        
            setTimeout(function()
            {
                print_text(textToTrim.slice(1), element, delay);
            }, delay );
        }
        else
        {
            element.innerHTML = text;
        }
    }
    print_text(text, element, delay);
    
}

/*
 *Changes logo of component for some time (delay) on mouse hover
*/
function changeDownloadLogo(elementId, delay)
{
    const element = document.getElementById(elementId);

    if(element.parentElement.onmouseenter)
    {
        element.src = "./icons8-downloads-folder.gif";
        
        setTimeout(function()
        {
            element.src = "./7124171_folder_download_icon.png";
        }, (delay));
    }
}

/*
 * Adds necessary own styles for the navigation bar that is from bootstrap
*/
function addNavBarMyStyles()
{
   const navItems = Array.from(document.getElementsByClassName('nav-item'));
   navItems.forEach(el => 
    {
        if(el.id === document.body.id)
        {
            el.children[0].classList.add('active');
        }
        else
        {
            el.children[0].classList.remove('active');
        }
   });
}

//#region to Set Color Mode

/*
 * 1. Finds out what color-mode icon to hide
 * 2. Calls the function to set, the preferred color style for the current html page elements
*/
function setColorMode()
{
    let color = getUserPreferedColorScheme();
    //Finds out what color-mode icon to hide
    const element =  document.getElementById(color + "-icon");
    if(element !== null)
    {
        element.setAttribute("display", "none");
    }

    setModeToElements();
}
/*
 * function on click event
 * 1. Swops the value of prefered previously by the user(in device settings or in previous use of website) 
 * to the oposite color mode
 * 2. Calls the function to set, the preferred color style for the current html page elements
 * 3. Hides and displays the necessary icons of chosen color-mode
*/
function toggleDarkMode()
{
    let color = getUserPreferedColorScheme();
    color = color === "light" ? "dark" : "light";

    localStorage["colorScheme"] = color;

    setModeToElements(color, color === "light" ? "dark" : "light")
    
    document.getElementById(color + "-icon").setAttribute("display", "none");
    document.getElementById(color === "dark" ? "light-icon" : "dark-icon").setAttribute("display", "block");
}

//#region of help methods to Set Color Mode

/*
 * Adding styles, to some elements of current html page, 
 * depending on user choise of color theme
 * In settings of device or if user choosed previously color mode of this site and its still 
 * saved in cashe of browser
*/
function setModeToElements()
{
    const colorAdd = getUserPreferedColorScheme();
    //finds out what is opposite color-mode of  prefers color theme by the user
    const colorRemove = colorAdd === "dark" ? "light" : "dark"; 

    //parts of class names from page-styles/style-page.css file
    const mode = "-mode";
    const navMode = "-nav-mode";
    const footerMode = "-footer-mode";
    const textMode = "-text-mode";
    const notImportant = "-not-important";
    
    //getts any links objects with css class names: "link-accordion-panel" and "third-parties-links"
    const links = Array.from(document.getElementsByClassName("link-accordion-panel")).concat(Array.from(document.getElementsByClassName("third-parties-links")));

    //for each element that needs to change color mode
    manageClasses(document.body, colorAdd + mode, colorRemove + mode);
    manageClasses(document.getElementById("navigation"), colorAdd + navMode, colorRemove + navMode);
    manageClasses(document.getElementById("footer"), colorAdd + footerMode, colorRemove + footerMode);
    manageClasses(Array.from(document.getElementsByClassName('nav-bar-text')), colorAdd + textMode, colorRemove + textMode);
    manageClasses(Array.from(document.getElementsByClassName("accordion")), colorAdd + textMode + notImportant, colorRemove + textMode + notImportant);
    manageClasses(links, colorAdd + textMode + notImportant, colorRemove + textMode + notImportant);
}

/*
 * Checks if elements is array and 
 * calls the function addRemoveClasses() neccessary times for elements once or for each element in elements
*/
function manageClasses(elements, toAdd, toRemove)
{
    if(typeof elements !== "undefined" && typeof toAdd !== "undefined" && typeof toRemove !== "undefined")
    {
        if(Array.isArray(elements))
        {
            elements.forEach(el => {
                addRemoveClasses(el, toAdd, toRemove);
            });
        }
        else
        {
            addRemoveClasses(elements, toAdd, toRemove);
        }
    }
}
/*
 * Adds and removes oposite color-mode clases when need to
*/
function addRemoveClasses(element, toAdd, toRemove)
{
    if(typeof element !== "undefined" && typeof toAdd !== "undefined" && typeof toRemove !== "undefined")
    {
        if(!element.classList.contains("active") && !element.classList.contains("active-skills"))
        {
            element.classList.add(toAdd);
        }
        else
        {
            element.classList.remove(toAdd);
        }
        element.classList.remove(toRemove);
    }
}
/*
 * Finds out and returns the name of color theme is user preferred.
 * Looks in browser cashe or in device settings, 
 * if there is nor stored cashe with key "colorScheme"
 * Also stores prefered color scheme in local cashe as value for key "colorScheme", 
 * if there nor such the key in the cashe
*/
function getUserPreferedColorScheme()
{
    //finds out what color mode is user preferred
    let color = localStorage['colorScheme'];
    if(typeof color === "undefined")
    {
        const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        color = darkModeMediaQuery.matches ? "dark" : "light";
        localStorage["colorScheme"] = color;
    }
    return color;
}
//#endregion of help methods to Set Color Mode
//#endregion to Set Color Mode