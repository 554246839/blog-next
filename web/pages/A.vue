<template>
  <nuxt-child></nuxt-child>
</template>

<script lang="ts">
import { defineComponent, computed, ref, getCurrentInstance, ComputedRef, SetupContext, PropType } from '@vue/composition-api'

interface User {
  firstName: string
  lastName: string
}

// IF(AND('Q'!$C$50="Yes",SUM(B3:B6)<>0),CHECK(SUM(B3:B6),-'C'!$E$10),-'C'!$E$10)
function parseExpression(str: string) {
  const len: number = str.length
  const checkStack: string[] = []
  // ‘（’堆栈
  const cache: string [] = []
  // 记录formula name
  let flag: string = ''
  // 记录check的参数
  let checkParams = ''
  // 已遇到check
  let checkStart = false
  // check函数结束
  let checkEnd = false
  // 遇到check之前的堆栈长度
  let cacheLen = 0
  
  for(let i = 0; i < len; i++) {
    const item = str[i]
    if (item === '(') {
      cache.push(item)

      if (flag.endsWith('CHECK')) {
        checkStart = true
        cacheLen = cache.length
      } else {
        flag = ''
      }
    } else if (item === ')') {
      if (cache.length === cacheLen) {
        cacheLen = 0
        checkEnd = true
        checkStart = false
        checkStack.push(`CHECK${checkParams})`)
        checkParams = ''
      }
      cache.pop()
    } else {
      flag += item
    }

    if (checkStart) {
      checkParams += item
    }

  }

  const result: Array<any> = parseCheck(checkStack)
  let resultFormula: string = str
  result.forEach((item: Array<string>) => {
    resultFormula = resultFormula.replace(item[0], item[1])
  })
  return resultFormula
}

function parseCheck(checkStack: string[]) {
  const checkReg: RegExp = /CHECK\((.*)\)/
  /**
   * result
   * [0]->expression: CHECK(SUM(B3:B6),-'C'!$E$10)
   * [1]->params1:    SUM(B3:B6)
   * [2]->params2:    -'C'!$E$10
   */
  const result: Array<any> = checkStack.map((check: string, idx: number) => {
    const params: RegExpExecArray | null = checkReg.exec(check)
    if (params) {
      const param: string = params[1]

      const len: number = param.length
      let paramA: string = ''
      let paramB: string = ''
      let flag: string = ''
      let index: number = 0
      let parseSuccess: boolean = false
      // ‘（’堆栈
      const cache: string [] = []

      for (let i = 0; i < len; i++) {
        const item: string = param[i]
        if (item === '(') {
          cache.push(item)
        } else if (item === ')') {
          cache.pop()
        } else if (item === ',') {
          if (cache.length === 0) {
            paramA = flag
            index = i
            parseSuccess = true
            break
          }
        }
        flag += item
      }

      if (parseSuccess) {
        paramB = param.slice(index + 1)
      }

      return [check, paramA, paramB]

    }
  })
  return parseCheckToIfFormula(result)
}

// check(A,B) 替换为 IF(A<>B,"CHECK "&A&CHAR(10) &" with "& B &CHAR(10)&"error "& A-B,A)
function parseCheckToIfFormula(result: Array<any>) {
  let parseResult: Array<any> = []

  parseResult = result.map((item: Array<string>) => {
    const A = item[1]
    const B = item[2]
    const ifFormula: string = `IF(${A}<>${B},"CHECK "&${A}&CHAR(10) &" with "& ${B} &CHAR(10)&" error "& ${A}-${B},${A})`

    return [item[0], ifFormula]
  })
  return parseResult
}

export default defineComponent({

  asyncData(context: any) {
    return {
      title: 'asyncData'
    }
  },

  layout: 'admin',

  setup (Props: PropType<any>, Context: SetupContext) {
    const str = `IF(AND('Q'!$C$50="Yes",SUM(B3:B6)<>0),CHECK(AND('Q'!$C$50="Yes",SUM(B3:B6)<>0),SUM(B4:B7)),-'C'!$E$10)`

    const ifFormula = parseExpression(str)
    // console.log(ifFormula, 'ifFormula=====================')
  }
})
</script>