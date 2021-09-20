window.methods = {
    checkFile: () => {
        if (document.querySelector('#file').files.length !== 0) {
            return true
        }
        return false
    },

    getFile: () => {
        const fileList = document.querySelector('#file').files;
        return window.methods.uploadFile(fileList[0])
    },

    scrollTop: () => {
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 2);
        
    },

    uploadFile: async (file) => {
        const url = `https://api.cloudinary.com/v1_1/isaaccloud/image/upload?upload_preset=y2pm46hq`
        try {
            const data = new FormData()
            data.append('file', file)
            const response = await fetch(url, {
                method: 'post',
                body: data,
            })
            const dataResponse = await response.json()
            return dataResponse.url
        } catch(e) {
            alert("An error occured. Please try again")
        }
    },

    postPayload: async (data) => {
        const url = `http://18.188.40.26:5000/api/docs`
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                method: 'post'
            })
            const dataResponse = await response.json()
            return dataResponse
        } catch (e) {
            alert("An error occured. Please try again")
        }
    },

    getSearchResults: async (searchValue) => {
        const url = `http://18.188.40.26:5000/api/search?query=${searchValue}`
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const dataResponse = await response.json()
            return dataResponse
        } catch (e) {
            alert("An error occured. Please try again")
            window.methods.clearLoader()
        }
    },

    getAutocompleteResults: async (searchValue) => {
        const url = `http://18.188.40.26:5000/api/search?query=${searchValue}&autocomplete=true`
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const dataResponse = await response.json()
            return dataResponse
        } catch (e) {
            alert("An error occured. Please try again")
            window.methods.clearLoader()
        }
    },

    getResult: async (id) => {
        const url = `http://18.188.40.26:5000/api/docs/${id}`
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const dataResponse = await response.json()
            console.log(dataResponse)
            return dataResponse
        } catch (e) {
            alert("An error occured. Please try again")
            window.methods.clearLoader()
        }
    },

    submitFile: async () => {
        try {
            document.querySelector('#upload-btn').disabled = true
            const fileUrl = await window.methods.getFile()
            const payload = {
                name: document.querySelector('#file-name').value.trim(),
                preview_text: document.querySelector('#preview-text').value.trim(),
                url: fileUrl
            }
            const response = await window.methods.postPayload(payload)
            if (response.data?.id) {
                alert('Document successfully queued for indexing')
                document.querySelector('#upload-btn').disabled = false
            }
        } catch {
            alert("An error occured. Please try again")
            window.methods.clearLoader()
        }
    },

    clearLoader: () => {
        if (document.querySelector('#loader')) {
            document.querySelector('#loader').remove()
        }
    },

    getValue: function () {
            if (document.querySelector('.dropdown .item')) {
                document.querySelector('.dropdown .item').addEventListener('onclick', (e) => {
                    console.log(e.target.value)
                })
            }
    }(),

    getDocuments: async () => {
        const url = `http://18.188.40.26:5000/api/docs`
        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const dataResponse = await response.json()
            return dataResponse
        } catch (e) {
            alert("An error occured. Please try again")
            window.methods.clearLoader()
        }
    },

}


