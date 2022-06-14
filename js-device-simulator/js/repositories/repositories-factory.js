export class RepositoriesFactory {

    static _repositories_instances = {}

    static getInstance(repositoryClass) {
        if (!this._repositories_instances[repositoryClass]) {
            this._repositories_instances[repositoryClass] = new repositoryClass();
        }
        return this._repositories_instances[repositoryClass];
    }
}