class TRWHelper {

    constructor(template = ''){
        this.pageTemplate = template;
    }

    isMobile(){
        if (window.matchMedia("(max-width: 767px)").matches) { 
            return true;
            // The viewport is less than 768 pixels wide 
            //console.log("This is a mobile device."); 
        } else {   
            return false;
            // The viewport is at least 768 pixels wide 
            //console.log("This is a tablet or desktop."); 
        } 
    }

    alignCollectionGridElements(){
        let collectionGridElem = document.getElementById('collection-grid');
        if(collectionGridElem && this.isMobile() && this.pageTemplate.indexOf('collection') > -1){
            let mobileRow = collectionGridElem.dataset.mobilerow ? parseInt(collectionGridElem.dataset.mobilerow) : 1;
            if(mobileRow === 1){
                let swatchElems = collectionGridElem.querySelectorAll('.trw-align-swatch-elem');
                let variantsElems = collectionGridElem.querySelectorAll('.trw-align-variants-elem');
                let addBtnsElems = collectionGridElem.querySelectorAll('.trw-align-addbtn-elem');

                if(swatchElems){
                    swatchElems = Array.prototype.slice.call(swatchElems);
                    if(swatchElems.length > 0){
                        swatchElems.map(swatchElem => swatchElem.classList.add('trw-aligned-swatch'));
                    }
                }

                if(variantsElems){
                    variantsElems = Array.prototype.slice.call(variantsElems);
                    if(variantsElems.length > 0){
                        variantsElems.map(variantsElem => variantsElem.classList.add('trw-aligned-variants'));
                    }
                }

                if(addBtnsElems){
                    addBtnsElems = Array.prototype.slice.call(addBtnsElems);
                    if(addBtnsElems.length > 0){
                        addBtnsElems.map(addBtnsElem => addBtnsElem.classList.add('trw-aligned-addbtns'));
                    }
                }
            }
        }
    }
}
export { TRWHelper }