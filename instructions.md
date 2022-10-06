### Usage Controller
````typescript
import Crud from '@ioc:Inovando/Crud/Decorator/Controller'
import TestRepository from '@ioc:TestServicoRepository'
import BaseTransformer from 'App/Transformers/BaseTranformer'
import EmpresaValidator from 'App/Validators/EmpresaValidator'
import NoValidator from 'App/Validators/NoValidotor'

@Crud({
  repository: TestRepository,
  storeProps: ['name', 'cnpj'],
  updateProps: [],
  validators: {
    store: EmpresaValidator,
    update: NoValidator,
  },
  transformer: BaseTransformer,
})
export default class TestController {}

```

The Inovando Adonis package `@Inovando/Controller` has been successfully configured.
