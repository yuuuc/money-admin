<template>
	<a-form :form="form" @submit="handleSubmit">
		<a-form-item v-bind="formItemLayout" label="姓名">
			<a-input
				v-decorator="[
					'name',
					{
						rules: [{ required: true, message: '请输入你的用户名' }]
					}
				]"
				placeholder="Please input your name"
			/>
		</a-form-item>

		<a-form-item v-bind="formItemLayout" label="昵称">
			<a-input
				v-decorator="[
					'username',
					{
						rules: [{ required: true, message: '请输入你的昵称' }]
					}
				]"
				placeholder="Please input your username"
			/>
		</a-form-item>

		<a-form-item v-bind="formItemLayout" label="手机号">
			<a-input
				v-decorator="[
					'tel',
					{
						rules: [{ required: true, message: '请输入手机号!' }],
						type: 'number'
					}
				]"
				style="width: 100%"
			>
				<a-select
					slot="addonBefore"
					v-decorator="['prefix', { initialValue: '86' }]"
					style="width: 70px"
				>
					<a-select-option value="86"> +86 </a-select-option>
				</a-select>
			</a-input>
		</a-form-item>

		<a-form-item v-bind="formItemLayout" label="密码" has-feedback>
			<a-input
				v-decorator="[
					'password',
					{
						rules: [
							{
								required: true,
								message: '请输入你的密码!'
							},
							{
								validator: validateToNextPassword
							}
						]
					}
				]"
				type="password"
			/>
		</a-form-item>
		<a-form-item v-bind="formItemLayout" label="重复密码" has-feedback>
			<a-input
				v-decorator="[
					'confirm',
					{
						rules: [
							{
								required: true,
								message: '请重复输入你的密码!'
							},
							{
								validator: compareToFirstPassword
							}
						]
					}
				]"
				type="password"
				@blur="handleConfirmBlur"
			/>
		</a-form-item>
		<a-form-item :wrapper-col="{ span: 12, offset: 9 }">
			<a-button type="primary" html-type="submit"> 提交 </a-button>
			<a-button style="margin-left: 20px" type="danger" @click="handleClear">
				清空
			</a-button>
		</a-form-item>
	</a-form>
</template>

<script>
export default {
	data() {
		return {
			confirmDirty: false,
			autoCompleteResult: [],
			formItemLayout: {
				labelCol: {
					xs: { span: 24 },
					sm: { span: 5 }
				},
				wrapperCol: {
					xs: { span: 24 },
					sm: { span: 16 }
				}
			},
			tailFormItemLayout: {
				wrapperCol: {
					xs: {
						span: 24,
						offset: 0
					},
					sm: {
						span: 16,
						offset: 8
					}
				}
			}
		}
	},
	beforeCreate() {
		this.form = this.$form.createForm(this, { name: 'userForm' })
	},
	methods: {
		handleClear() {
			this.form.resetFields()
		},
		handleSubmit(e) {
			const { form } = this
			e.preventDefault()
			form.validateFieldsAndScroll((err, values) => {
				if (!err) {
					this.$emit('putUser', values)
					form.resetFields()
				}
			})
		},
		handleConfirmBlur(e) {
			const value = e.target.value
			this.confirmDirty = this.confirmDirty || !!value
		},
		compareToFirstPassword(rule, value, callback) {
			const form = this.form
			if (value && value !== form.getFieldValue('password')) {
				callback('两次输入的密码不相同!')
			} else {
				callback()
			}
		},
		validateToNextPassword(rule, value, callback) {
			const form = this.form
			const reg = /^[a-zA-Z]{1}[a-z0-9A-Z]{5,19}$/
			if (value.trim() == '') {
				callback()
			}
			if (!reg.exec(value)) {
				callback('密码必须以字母开头,长度为6-20')
			} else {
				if (value && this.confirmDirty) {
					form.validateFields(['confirm'], { force: true })
				}
				callback()
			}
		}
	}
}
</script>
