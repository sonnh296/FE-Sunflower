import {
  createPaymentApi,
  getAvailableBalanceApi,
  getCurrentBalanceApi,
  getListPaymentApi,
  getPaymentByIdApi,
  type PaymentCreateRequest,
  type PaymentListRequest
} from '@/api/paymentStoreApi'
import { LIMIT_PER_PAGE } from '@/constants/tableValues'
import type { Payment } from '@/types/Payment'
import { defineStore } from 'pinia'

interface State {
  searchPayment: PaymentListRequest
  myPayments: Payment[]
  myPaymentDetail: Payment | undefined
  loading: boolean
  loadingDetail: boolean
  requestingAddMoney: boolean
  requestingGetBalance: boolean
  total: number
  balance: number
  availableBalance: number
}

export const usePaymentStoreOwner = defineStore('paymentStoreOwner', {
  state: (): State => {
    return {
      searchPayment: {
        limit: LIMIT_PER_PAGE,
        offset: 0
      },
      myPayments: [],
      myPaymentDetail: undefined,
      loading: false,
      loadingDetail: false,
      requestingAddMoney: false,
      requestingGetBalance: false,
      total: 0,
      balance: 0,
      availableBalance: 0
    }
  },
  actions: {
    async getMyPayments() {
      this.loading = true
      this.myPayments = []
      const { data } = await getListPaymentApi(this.searchPayment)
      this.myPayments = data.data
      this.total = data.meta?.total ?? 0
      this.loading = false
      return data
    },

    async changePagePaymentHistory(page: number) {
      this.searchPayment.offset = (page - 1) * this.searchPayment.limit
      await this.getMyPayments()
    },

    async getDetailPayment(id: number) {
      this.loadingDetail = true
      const { data } = await getPaymentByIdApi(id)
      this.myPaymentDetail = data.data
      this.loadingDetail = false
      return data
    },

    async getCurrentBalance() {
      this.requestingGetBalance = true
      const { data } = await getCurrentBalanceApi()
      this.balance = data.data
      this.requestingGetBalance = false
      return data
    },

    async getAvailableAmount() {
      const { data } = await getAvailableBalanceApi()
      this.availableBalance = data.data
      return data
    },

    async addMoney(params: PaymentCreateRequest) {
      this.requestingAddMoney = true
      const { data } = await createPaymentApi(params)
      this.requestingAddMoney = false
      return data
    }
  }
})
