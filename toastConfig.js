// toastConfig.js

import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const toastConfig = {
  error: ({ text1, text2 }) => (
    <View className="flex-row items-center justify-start w-[90%] h-[60px] border border-red-400 bg-red-100 p-3 rounded-lg shadow-lg">
      <Ionicons name="close-circle" size={24} color="#D92D20" />
      <View className="ml-3">
        {text1 && (
          <Text className="text-red-700 text-[14px] font-bold">
            {text1}
          </Text>
        )}
        {text2 && (
          <Text className="text-red-600 text-[12px]">
            {text2}
          </Text>
        )}
      </View>
    </View>
  ),
  success: ({ text1, text2 }) => (
    <View className="flex-row items-center justify-start w-[90%] h-[60px] border border-green-300 bg-green-100 p-3 rounded-lg shadow-lg">
      <Ionicons name="checkmark-circle" size={24} color="#067647" />
      <View className="ml-3">
        {text1 && (
          <Text className="text-green-800 text-[14px] font-bold">
            {text1}
          </Text>
        )}
        {text2 && (
          <Text className="text-green-700 text-[12px]">
            {text2}
          </Text>
        )}
      </View>
    </View>
  ),
  delete: ({ text1, text2 }) => (
    <View className="flex-row items-center justify-start w-[90%] h-[60px] border border-red-400 bg-red-100 p-3 rounded-lg shadow-lg">
      <Ionicons name="trash" size={24} color="#D92D20" />
      <View className="ml-3">
        {text1 && (
          <Text className="text-red-700 text-[14px] font-bold">
            {text1}
          </Text>
        )}
        {text2 && (
          <Text className="text-red-600 text-[12px]">
            {text2}
          </Text>
        )}
      </View>
    </View>
  ),
  warn: ({ text1, text2 }) => (
    <View className="flex-row items-center justify-start w-[90%] h-[60px] border border-yellow-400 bg-yellow-100 p-3 rounded-lg shadow-lg">
      <Ionicons name="warning-outline" size={24} color="#D97706" />
      <View className="ml-3">
        {text1 && (
          <Text className="text-yellow-800 text-[14px] font-bold">
            {text1}
          </Text>
        )}
        {text2 && (
          <Text className="text-yellow-700 text-[12px]">
            {text2}
          </Text>
        )}
      </View>
    </View>
  ),
  info: ({ text1, text2 }) => (
    <View className="flex-row items-center justify-start w-[90%] h-[60px] border border-blue-300 bg-blue-100 p-3 rounded-lg shadow-lg">
      <Ionicons name="information-circle-outline" size={24} color="#2563EB" />
      <View className="ml-3">
        {text1 && (
          <Text className="text-blue-800 text-[14px] font-bold">
            {text1}
          </Text>
        )}
        {text2 && (
          <Text className="text-blue-700 text-[12px]">
            {text2}
          </Text>
        )}
      </View>
    </View>
  ),
};

export default toastConfig;