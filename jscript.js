
function includeHtmlDoc(inElement, page)
{
    $(document.getElementById(inElement)).load(page);
}

function accordion()
{
    var accardion = document.getElementsByClassName("accordion");
    var index;
                                
    for (index = 0; index < accardion.length; index++) 
    {
        accardion[index].addEventListener("click", 
        function() 
        {
            this.classList.toggle('active');
            
            var panel = this.nextElementSibling;
            if (panel.style.display === 'block') 
            {
                var char = '<b>︾</b>';
                panel.style.display = 'none';
                this.innerHTML = (this.innerHTML.substring(0, this.innerHTML.length - char.length)) +  char;
            } 
            else 
            {
                var char = '<b>︽</b>';
                panel.style.display = 'block';
                this.innerHTML = (this.innerHTML.substring(0, this.innerHTML.length - char.length)) +  char;
            }
            
        });
    }
}

function accordionForSkills()
{
    var accardion = document.getElementsByClassName("accordion-skills");
    var index;
                                
    for (index = 0; index < accardion.length; index++) 
    {
        accardion[index].addEventListener("click", 
        function() 
        {
            this.classList.toggle('active-skills');
            var char = '';
            var panel = this.nextElementSibling;
            if (panel.style.display === 'block') 
            {
                char = '<b>︾</b>';
                panel.style.display = 'none';
            } 
            else 
            {
                char = '<b>︽</b>';
                panel.style.display = 'block';
            }
            this.innerHTML = (this.innerHTML.substring(0, (this.innerHTML.length - char.length))) + char;
        });
    }
}

function selfPrintitngText(elementId, delay, text)
{
    var element = document.getElementById(elementId);
    var carret = '_';
    var print_text = function(textToTrim, element, delay)
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

function changeDownloadLogo(elementId, delay)
{
    var element = document.getElementById(elementId);

    if(element.parentElement.onmouseenter)
    {
        element.src = "./icons8-downloads-folder.gif";
        
        setTimeout(function()
        {
            element.src = "./icons8-downloads-folder-50.png";
        }, (delay));
        
    }
}

function addNavBar(elementId)
{
    var element = document.getElementById(elementId);

    element.innerHTML="<div  class='container-fluid'><a class='navbar-brand active' href='./index.html'>msichova </a><button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown' aria-controls='navbarNavDropdown' aria-expanded='false' aria-label='Toggle navigation'><span class='navbar-toggler-icon'></span></button><div class='collapse navbar-collapse' id='navbarNavDropdown'><ul class='navbar-nav'><li class='nav-item' id='index.html' ><a class='nav-link nav-bar-text'  href='./index.html'>Home</a></li><li class='nav-item' id='education.html'><a class='nav-link nav-bar-text' href='./education.html' >Education</a></li><li class='nav-item' id='resume.html'><a class='nav-link nav-bar-text' href='./resume.html' >Resume</a></li><li class='nav-item' id='projects.html'><a class='nav-link nav-bar-text' href='./projects.html'>Projects</a></li></ul></div></div>";

   const navItems = Array.from(document.getElementsByClassName('nav-item'));
   navItems.forEach(el => 
    {
    if(el.id === document.body.id)
    {
        el.firstChild.classList.add('active');
    }
    else
    {
        el.firstChild.classList.remove('active');
    }
   });
}
