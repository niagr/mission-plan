import React from  'react'

import TaskCard from './TasksCard'

import {apiService, APIError} from '../services/api'

export default class MainContainer extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            tasks: undefined,
            error: undefined,
        }
    }

    componentDidMount() {
        this.loadTasks()
    }

    async loadTasks () {
        try{
            const tasks = await apiService.getTasks()
            this.setState({tasks})
        } catch (e) {
            if (e instanceof APIError) {
                this.setState({error: e})
            } else {
                throw e
            }
        }
    }

    render () {
        const {tasks=[], error} = this.state
        return (
            <div>
                {error ? 
                    <span>Error: {error.userMsg}</span>
                :    
                    tasks.map((t, i) => <TaskCard key={`task${i}`} name={t.name} desc={t.desc} />)
                }
            </div>
        )

    }

}