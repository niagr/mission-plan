function handleError(err, ...errClasses) {
    if (!errClasses.some(cls => err instanceof cls)) {    
        throw err
    }
}