const API_KEY = 'AIzaSyCyvkgTvaPcO68J2M60AzhjGgx8BDwfiJ0';
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

const store = {
  videos: []
};

/**
 * @function fetchVideos
 * Async function, responsible for calling the Youtube API with jQuery, constructing
 * the correct query object, and passing along the callback into the AJAX call.
 * @param {string}   searchTerm
 * @param {function} callback
 */
const fetchVideos = function(searchTerm, callback) {
  $.getJSON(`${BASE_URL}?part=snippet&key=${API_KEY}&q=${searchTerm}`, callback);
};

/**
 * @function decorateResponse
 * Uses Youtube API response to create an array of "decorated" video objects as 
 * defined at the top of the file.
 * @param   {object} response - should match Youtube API response shape
 * @returns {array}
 */
const decorateResponse = function(response) {
  return response.items.map( video => {
    return {
      id: video.id.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.high
    }
  } );
};

/**
 * @function generateVideoItemHtml
 * Template function, creates an HTML string from a single decorated video object
 * @param   {object} video - decorated video object
 * @returns {string} HTML 
 */
const generateVideoItemHtml = function(video) {
  return `
    <li>
      <a href='https://www.youtube.com/watch?v=${video.id}' target='_blank'>
        <img src='${video.thumbnail.url}' alt='${video.title}' width='${video.thumbnail.width}' height='${video.thumbnail.height}' />
        <div class='video-details'>
          <h3>${video.title}</h3>
          <p>${video.description}</p>
        <div>
      </a>
    </li>
  `;
};

/**
 * @function addVideosToStore
 * Store modification function to set decorated video objects
 * @param {array} videos - decorated video objects
 */
const addVideosToStore = function(videos) {
  store.videos = videos;
};


/**
 * @function render
 * Responsible for scanning store and rendering the video list to DOM
 */
// TEST IT!
const render = function() {
  let videos = store.videos.map(video => {
    return generateVideoItemHtml(video);
  });

  $('.results').html(videos);
};

/**
 * @function handleFormSubmit
 * Adds form "submit" event listener that 1) initiates API call, 2) modifies store,
 * and 3) invokes render
 */
const handleFormSubmit = function() {
  $('form').on('submit', (event) => {
    event.preventDefault();
    let searchTerm = $('#search-term').val();
    $('#search-term').val('');
    fetchVideos(searchTerm, (response) => {
      addVideosToStore(decorateResponse(response));
      render();
    });
  });
};

// When DOM is ready:
$(() => handleFormSubmit());
