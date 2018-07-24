(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{"./node_modules/code-example/lib/cmake.js":function(n,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default='# vim: syntax=cmake\nif(NOT CMAKE_BUILD_TYPE)\n    # default to Release build for GCC builds\n    set(CMAKE_BUILD_TYPE Release CACHE STRING\n        "Choose the type of build, options are: None(CMAKE_CXX_FLAGS or CMAKE_C_FLAGS used) Debug Release RelWithDebInfo MinSizeRel."\n        FORCE)\nendif()\nmessage(STATUS "cmake version ${CMAKE_VERSION}")\nif(POLICY CMP0025)\n    cmake_policy(SET CMP0025 OLD) # report Apple\'s Clang as just Clang\nendif()\nif(POLICY CMP0042)\n    cmake_policy(SET CMP0042 NEW) # MACOSX_RPATH\nendif()\n\nproject (x265)\ncmake_minimum_required (VERSION 2.8.8) # OBJECT libraries require 2.8.8\ninclude(CheckIncludeFiles)\ninclude(CheckFunctionExists)\ninclude(CheckSymbolExists)\ninclude(CheckCXXCompilerFlag)\n\n# X265_BUILD must be incremented each time the public API is changed\nset(X265_BUILD 48)\nconfigure_file("${PROJECT_SOURCE_DIR}/x265.def.in"\n               "${PROJECT_BINARY_DIR}/x265.def")\nconfigure_file("${PROJECT_SOURCE_DIR}/x265_config.h.in"\n               "${PROJECT_BINARY_DIR}/x265_config.h")\n\nSET(CMAKE_MODULE_PATH "${PROJECT_SOURCE_DIR}/cmake" "${CMAKE_MODULE_PATH}")\n\n# System architecture detection\nstring(TOLOWER "${CMAKE_SYSTEM_PROCESSOR}" SYSPROC)\nset(X86_ALIASES x86 i386 i686 x86_64 amd64)\nlist(FIND X86_ALIASES "${SYSPROC}" X86MATCH)\nif("${SYSPROC}" STREQUAL "" OR X86MATCH GREATER "-1")\n    message(STATUS "Detected x86 target processor")\n    set(X86 1)\n    add_definitions(-DX265_ARCH_X86=1)\n    if("${CMAKE_SIZEOF_VOID_P}" MATCHES 8)\n        set(X64 1)\n        add_definitions(-DX86_64=1)\n    endif()\nelseif(${SYSPROC} STREQUAL "armv6l")\n    message(STATUS "Detected ARM target processor")\n    set(ARM 1)\n    add_definitions(-DX265_ARCH_ARM=1 -DHAVE_ARMV6=1)\nelse()\n    message(STATUS "CMAKE_SYSTEM_PROCESSOR value `${ CMAKE_SYSTEM_PROCESSOR }` is unknown")\n    message(STATUS "Please add this value near ${CMAKE_CURRENT_LIST_FILE}:${CMAKE_CURRENT_LIST_LINE}")\nendif()\n\nif(UNIX)\n    list(APPEND PLATFORM_LIBS pthread)\n    find_library(LIBRT rt)\n    if(LIBRT)\n        list(APPEND PLATFORM_LIBS rt)\n    endif()\n    find_package(Numa)\n    if(NUMA_FOUND)\n        list(APPEND CMAKE_REQUIRED_LIBRARIES ${NUMA_LIBRARY})\n        check_symbol_exists(numa_node_of_cpu numa.h NUMA_V2)\n        if(NUMA_V2)\n            add_definitions(-DHAVE_LIBNUMA)\n            message(STATUS "libnuma found, building with support for NUMA nodes")\n            list(APPEND PLATFORM_LIBS ${NUMA_LIBRARY})\n            link_directories(${NUMA_LIBRARY_DIR})\n            include_directories(${NUMA_INCLUDE_DIR})\n        endif()\n    endif()\n    mark_as_advanced(LIBRT NUMA_FOUND)\nendif(UNIX)\n\nif(X64 AND NOT WIN32)\n    option(ENABLE_PIC "Enable Position Independent Code" ON)\nelse()\n    option(ENABLE_PIC "Enable Position Independent Code" OFF)\nendif(X64 AND NOT WIN32)\n\n# Compiler detection\nif(CMAKE_GENERATOR STREQUAL "Xcode")\n  set(XCODE 1)\nendif()\nif (APPLE)\n  add_definitions(-DMACOS)\nendif()\n\n'}}]);