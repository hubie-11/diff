// align collection grid elements for mobile grid when mobile per row = 1
let collectionGridElem = document.getElementById('collection-grid');
if(collectionGridElem){
    import(Shopify.trw.module.trwhelper)
        .then(trwhelper => {
            let helperObj = new trwhelper.TRWHelper(Shopify.theme.settings.template);
            helperObj.alignCollectionGridElements();
        }).catch(err => console.log(err));
}