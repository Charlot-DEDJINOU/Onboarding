import Toast from 'react-native-toast-message';

export const ToastSuccess = (description) => {
    Toast.show({
        type: 'success',
        text1: "Succès",
        text1: description,
        visibilityTime: 5000,
    });
};

export const ToastWarning = (description) => {
    Toast.show({
        type: 'warn',
        text1: "Avertissement",
        text2: description,
        visibilityTime: 5000,
    });
};

export const ToastInfo = (description) => {
    Toast.show({
        type: 'info',
        text1: "Info",
        text2: description,
        visibilityTime: 5000,
    });
};

export const ToastDelete = (description) => {
    Toast.show({
        type: 'delete',
        text1: "Supression",
        text2: description,
        visibilityTime: 5000,
    });
};