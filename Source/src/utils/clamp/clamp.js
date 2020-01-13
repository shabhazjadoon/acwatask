import MultiClamp from 'multi-clamp';

$().ready(function() {
    var clampElemns = document.querySelectorAll('[clamp-text]');
    if(clampElemns){
        [].map.call(clampElemns , (elem) => {
            new MultiClamp(elem , {
                ellipsis: '... <a href="javascript:void(0);" class="body-more-link link-primary-style">Read More</a>',
                clamp: 2
            });
        })
    }
    
});