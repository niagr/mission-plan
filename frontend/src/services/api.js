export class APIError extends Error {
    constructor (userMsg='', data) {
        super(userMsg)
        this.userMsg = userMsg
        this.data = data
    }
}

class APIService {

    rootUrl = `${process.env.API_URL}/api`

    defaultErrMsg = 'Something went wrong'

    _fillFormData (data) {
        const formData = new FormData()
        for (let [key, val] of Object.entries(data)) {
            formData.append(key, val)
        }
        return formData
    }

    async _apiCall (method, url, data={}) {
        try {
            const response = await fetch(this.rootUrl + url, {
                method,
                body: method == 'POST' ? this._fillFormData(data) : undefined,
            })
            const respData = await response.json()
            respData.userMsg = respData.userMsg || this.defaultErrMsg
            if (response.ok) {
                return respData
            } else {
                throw new APIError(respData.userMsg, respData)
            }
        } catch (e) {
            // catch network errors and JSON parse errors
            if (e instanceof TypeError || e instanceof SyntaxError) {
                throw new APIError(this.defaultErrMsg)
            } else {
                throw e
            }
        }
    }

    async getTasks () {
        const tasks = (await this._apiCall('GET', '/tasks')).tasks
        return tasks
    }

}

export const apiService = new APIService()