import { data2 } from './api.js'

function onYouTubeIframeAPIReady(videoId = 'JEq10L7u3SM', seconds) {
    let player;
    player = new YT.Player('player', {
        height: '350',
        width: '580',
        videoId: ``,
        playerVars: {
            'playsinline': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': 
            (event) => {
                switch (event.data) {
                    case 0:     // ended
                        player.stopVideo();
                        break;
                    case -1:    // unstarted
                    case 1: onPlayerStateChange()
                    case 2:     // paused
                    case 3:     // buffering
                    case 5:     // video cued
                    default:
                        break;
                }
            }
            // onPlayerStateChange
        }
    });

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target.playVideo();
        player.loadVideoById(`${videoId}`, 0, "default");
        if (seconds != null) {
            console.log(event.target)
            console.log(seconds)
        }
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    function onPlayerStateChange(event) {
        // if (event.data === 1) {
            console.log('player running')
            document.body.addEventListener('click', (e) => {
                if (e.target.matches('.time')) {
                    e.preventDefault()
                    console.log(data2[0])
                    console.log(data2[1].indexOf(e.target.innerHTML))
                    const time = data2[0][data2[1].indexOf(e.target.innerHTML)]
                    console.log(time)
                    player.seekTo(time, true)
                }
            })
        // }
    }


}
export { onYouTubeIframeAPIReady }