vega.exportGraphAs = function(view, type, name) {
    view.toImageURL(type).then(function(url) {
      var link = document.createElement('a');
      console.log('hello I am a function');
      link.setAttribute('href', url);
      link.setAttribute('target', '_blank');
      link.setAttribute('download', name + '.' + type);
      link.dispatchEvent(new MouseEvent('click'));
    }).catch(function(error) { console.error(error); });

};

Object.defineProperty(Array.prototype, 'chunk', {
    value: function(chunkSize) {
        var R = [];
        for (var i=0; i<this.length; i+=chunkSize)
            R.push(this.slice(i,i+chunkSize));
        return R;
    }
});