var editor = new (function (){


    this.init = function(){

        var buttons = [
            {command: 'fontName', type: 'input', values: ['Arial', 'Comic Sans MS' ,'Verdana']},
            {command: 'fontSize', type: 'input', values: [1,2,3,4,5,6,7]},
            {command: 'bold', type: 'button', innerHTML: '<i class="fas fa-bold"></i>'},
            {command: 'italic', type: 'button', innerHTML: '<i class="fas fa-italic"></i>'},
            {command: 'underline', type: 'button', innerHTML: '<i class="fas fa-underline"></i>'},
            {command: 'strikethrough', type: 'button', innerHTML: '<i class="fas fa-strikethrough"></i>'},
            {command: 'justifyLeft', type: 'button', innerHTML: '<i class="fas fa-align-left"></i>'},
            {command: 'justifyCenter', type: 'button', innerHTML: '<i class="fas fa-align-center"></i>'},
            {command: 'justifyFull', type: 'button', innerHTML: '<i class="fas fa-align-right"></i>'}
        ];

        loadIcons();

        var container = document.createElement('div');
        container.setAttribute('class', 'container');
        container.appendAfter(document.getElementById('main'));
        
        var textField = document.createElement("iframe");
        container.appendChild(textField);
        textField.setAttribute('name', 'textEditorField');
        textField.setAttribute('id', 'textEditorField');
        textField.style.width = "100%";
        textField.style.border = 'solid 1px lightgray';
        
        setTimeout(function(){
            textField.contentDocument.designMode = "on";
        }, 0);
        
        for(var i = 0 in buttons ) {
            var button = document.createElement(buttons[i].type);
            button.setAttribute('command', buttons[i].command)


            if(buttons[i].type == "button"){
                button.innerHTML = buttons[i].innerHTML;
                button.onclick = function (){
                    var command = this.getAttribute('command');
                    textField.contentDocument.execCommand(command, false, null);
                }
            }else if(buttons[i].type == 'input'){
                if(buttons[i].values !=null){
                    var list = document.createElement('datalist');
                    var id = buttons[i].command + 'List';
                    list.setAttribute('id', id);
                    button.setAttribute('list', id);
                    var values = buttons[i].values;

                    for(var op = 0 in values){
                        var option = document.createElement('option');
                        option.value = values[op];
                        list.appendChild(option);
                    }

                    button.addEventListener( 'change', function (){
                        var command = this.getAttribute('command');
                        textField.contentDocument.execCommand(command, false, this.value);
                    });
                    list.appendBefore(textField);

                }
            }
            
            button.appendBefore(textField);

            
        }
    };

    Element.prototype.appendBefore = function( element ){
        element.parentNode.insertBefore(this, element);
    }, false;

    Element.prototype.appendAfter = function( element ){
        element.parentNode.insertBefore(this, element.nextSibling);
    }, false;

    var execCommand = function (textField,  command ) {
        textField.contentDocument.execCommand(command, false, null);
    }
 
    var loadIcons = function () {
        var icons = document.createElement('script');
        icons.src = 'https://kit.fontawesome.com/d07178cc9f.js';
        document.head.appendChild(icons);
    }
});