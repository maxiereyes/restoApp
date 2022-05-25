import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { ListItem, Icon } from '@rneui/base'
import { map } from 'lodash'
import Modal from '../../components/shared/Modal'
import ChangeNameForm from './ChangeNameForm'
import ChangeEmailForm from './ChangeEmailForm'
import ChangePasswordForm from './ChangePasswordForm'

const AccountOptions = ({onReload}) => {
    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)

    const onCloseOpenModal = () => setShowModal(prevState => !prevState)

    const handleClick = (key) => {
        if (key === 1) {
            setRenderComponent(<ChangeNameForm onClose={onCloseOpenModal} onReload={onReload}/>)
        }

        if (key === 2) {
            setRenderComponent(<ChangeEmailForm onClose={onCloseOpenModal} onReload={onReload}/>)
        }

        if (key === 3) {
            setRenderComponent(<ChangePasswordForm onClose={onCloseOpenModal}/>)
        }

        onCloseOpenModal()
    }

    const options = menuOptions(handleClick)

    return (
        <View>
        {map(options, (menu, index) => (
            
            <ListItem key={index} bottomDivider onPress={menu.click}>
                <Icon type={menu.iconType} name={menu.iconNameLeft} color={menu.iconColorLeft} />
                <ListItem.Content>
                    <ListItem.Title>{menu.title}</ListItem.Title>
                </ListItem.Content>
                <Icon type={menu.iconType} name={menu.iconNameRight} color={menu.iconColorRight} />
            </ListItem>
        ))}

            <Modal show={showModal} close={onCloseOpenModal}>
                {renderComponent}
            </Modal>
        </View>
    )
}

export default AccountOptions

const styles = StyleSheet.create({})

function menuOptions(handleClick) {
    return [
        {
            title: 'Cambiar Nombre y Apellido',
            iconType: 'material-community',
            iconNameLeft: 'account-circle',
            iconColorLeft: '#ccc',
            iconNameRight: 'chevron-right',
            iconColorRight: '#ccc',
            click: () => handleClick(1)
        },
        {
            title: 'Cambiar Email',
            iconType: 'material-community',
            iconNameLeft: 'at',
            iconColorLeft: '#ccc',
            iconNameRight: 'chevron-right',
            iconColorRight: '#ccc',
            click: () => handleClick(2)
        },
        {
            title: 'Cambiar Contraseña',
            iconType: 'material-community',
            iconNameLeft: 'lock-reset',
            iconColorLeft: '#ccc',
            iconNameRight: 'chevron-right',
            iconColorRight: '#ccc',
            click: () => handleClick(3)
        }
    ]
}