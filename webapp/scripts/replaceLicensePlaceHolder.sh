#!/usr/bin/env bash

# Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
#
# This file is part of REGARDS.
#
# REGARDS is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# REGARDS is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with REGARDS. If not, see <http://www.gnu.org/licenses/>.

# Find all files with placeholder
files=`find -type f | grep -v node_modules | grep -v reports | grep -v "\./\." | grep -v "/dist" | grep -v "/target" | xargs grep "\ \*\ LICENSE_PLACEHOLDER" | cut -d ':' -f1`

# License to use
text=" * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES\n *\n * This file is part of REGARDS.\n *\n * REGARDS is free software: you can redistribute it and/or modify\n * it under the terms of the GNU General Public License as published by\n * the Free Software Foundation, either version 3 of the License, or\n * (at your option) any later version.\n *\n * REGARDS is distributed in the hope that it will be useful,\n * but WITHOUT ANY WARRANTY; without even the implied warranty of\n * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the\n * GNU General Public License for more details.\n *\n * You should have received a copy of the GNU General Public License\n * along with REGARDS. If not, see <http://www.gnu.org/licenses/>."

# Replace placeholder with GPLv3 license
for f in $files; do
 echo $f
 sed -i "s+^\ \*\ LICENSE_PLACEHOLDER$+$text+g" $f
done
