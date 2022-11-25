import React from 'react'
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';

function VideoPlayer() {
  return (
    <div>
      <Video autoPlay loop muted
            controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
            poster="http://sourceposter.jpg"
            onCanPlayThrough={() => {
                // Do stuff
            }}>
            <source src="http://res.cloudinary.com/dwxxqd2zu/raw/upload/v1668663185/esrz9cgl9ussanmbsp5b" type="video/webm" />
           
        </Video>
    </div>
  )
}

export default VideoPlayer