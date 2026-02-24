  export  function getAbsUrl(uri: string ='') {
      if (!uri.toLowerCase().startsWith("http")) {
        uri =`${import.meta.env.VITE_GLOB_API_URL}${uri}`
      }
    return uri;
  }


 