function addHorizontalTouchScrolling(elementId)
{
    var element = $('#'+ elementId);
    mc = new Hammer.Manager(element, {
        touchAction: 'auto',
        recognizers: [
            [Hammer.Swipe, { direction: Hammer.DIRECTION_HORIZONTAL }],
        ]
    });

    // listen to events...
    mc.on("swipeleft swiperight swipeup swipedown", function(ev) {
        console.log(ev.type +" gesture detected.");
        console.log(ev);
    });
}
