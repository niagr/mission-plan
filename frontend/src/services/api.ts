import { Task } from "types";

enum METHOD {
    POST = 'POST',
    GET = 'GET',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

export class APIError extends Error {

    userMsg: string
    data: any

    constructor (userMsg='', data=null) {
        super(userMsg)
        this.userMsg = userMsg
        this.data = data
    }
}

class APIService {

    rootUrl = `${process.env.API_URL}/api`

    defaultErrMsg = 'Something went wrong'

    _fillFormData (data: {[k: string]: string}) {
        const formData = new FormData()
        for (let [key, val] of Object.entries(data)) {
            formData.append(key, val)
        }
        return formData
    }

    async _apiCall (method: METHOD, url: string, data={}) {
        try {
            const response = await fetch(this.rootUrl + url, {
                method,
                body: [METHOD.POST, METHOD.PUT].includes(method) ? this._fillFormData(data) : undefined,
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

    async getBoards () {
        return (await this._apiCall(METHOD.GET, '/boards/')).boards
    }

    async getTasks (boardId: number) {
        const tasks = (await this._apiCall(METHOD.GET, `/board/${boardId}/tasks/`)).tasks
        return tasks
    }

    async getTask (boardId: number, taskId: number) {
        return (await this._apiCall(METHOD.GET, `/board/${boardId}/task/${taskId}/`)).task
    }

    async changeTask (boardId: number, taskId: number, taskData: Partial<Task>) {
        return (await this._apiCall(METHOD.PUT, `/board/${boardId}/task/${taskId}/`, taskData)).task
    }

}

export const apiService = new APIService()
