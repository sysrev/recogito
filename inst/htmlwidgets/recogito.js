HTMLWidgets.widget({
  name: 'recogito',
  type: 'output',
  factory: function(el, width, height) {
    var formatter = (anno) => "tag-".concat(anno.body[0].value) 

    return {
      renderValue: function(x) {
        el.innerText = x.text;
        
        var r = Recogito.init({
          content: el.id,
          mode: x.mode,
          formatter: formatter,
          widgets: ['COMMENT', { widget: 'TAG', vocabulary: x.tags }],
          readOnly: false
        });
        
        set_shiny = () => Shiny.setInputValue(x.inputId, JSON.stringify(r.getAnnotations()))
        r.on('updateAnnotation', set_shiny)
        r.on('createAnnotation', set_shiny)

  
        mode_btn = document.getElementById(el.id.concat("-toggle"))
        mode = mode_btn.innerHTML === 'MODE: RELATIONS' ? "RELATIONS" : "ANNOTATION"

        mode_btn.addEventListener('click', () => {
          mode_btn.innerHTML = mode === 'ANNOTATION' ? 'MODE: RELATIONS' : 'MODE: ANNOTATION'
          mode = mode === 'ANNOTATION' ? 'RELATIONS' : 'ANNOTATION'
          r.setMode(mode);
        })
        
      },
      resize: function(width, height) {
      }
    };
  }
});
